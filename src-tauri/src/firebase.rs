use super::models;
use std::{ops::Index, sync::Mutex};

use firestore::*;
use gcloud_sdk::GCP_DEFAULT_SCOPES;
use serde::Serialize;
use tauri::Manager;

/**
 * This function retrieves a reference to the global Firestore instance
 */
pub async fn access_firestore(handle: tauri::AppHandle) -> Result<FirestoreDb, String> {
    println!("[FIRESTORE INIT] Attempting to retrieve global Firestore instance");
    let curr_firestore: Option<tauri::State<models::DB>> = handle.try_state::<models::DB>();

    match curr_firestore {
        Some(state) => {
            println!("[FIRESTORE INIT] Firestore instance detected... retrieving");

            return Ok(state.firestore.lock().unwrap().to_owned());
        }

        None => {
            println!("[FIRESTORE INIT] No Firestore instance detected... initializing");

            let curr_creds_state = handle.state::<models::Credentials>();

            let resource_path = curr_creds_state.path.lock().unwrap().to_owned();
            let firestore: Result<FirestoreDb, errors::FirestoreError> =
                FirestoreDb::with_options_token_source(
                    FirestoreDbOptions::new("neutron-expo".to_string()),
                    || -> Vec<String> {
                        let mut vec1 = GCP_DEFAULT_SCOPES.clone();
                        vec1.push("https://www.googleapis.com/auth/datastore".to_string());
                        return vec1;
                    }(),
                    gcloud_sdk::TokenSourceType::File(resource_path),
                )
                .await;

            match firestore {
                Ok(firestore) => {
                    println!("[FIRESTORE INIT] Succesfully initialized Firestore instance... Persisting to app state for later use");
                    handle.manage(models::DB {
                        firestore: Mutex::new(firestore.clone()),
                    });
                    return Ok(firestore);
                }

                Err(err) => {
                    return Err(err.to_string());
                }
            }
        }
    }
}

pub async fn write_batched_to_firestore<'a, T>(
    firestore: &FirestoreDb,
    payload: &mut Vec<T>,
    collection_name: &str,
    batch_size: usize,
    id_key: String,
) -> Result<String, String>
where
    T: Serialize + Sync + Send + for<'de> serde::Deserialize<'de> + Index<String, Output = String>,
{
    let batches = payload.len() / batch_size;
    let batch_writer = firestore.create_simple_batch_writer().await;

    match batch_writer {
        Ok(batch_writer) => {
            let chunks = payload.chunks(batch_size);

            for chunk in chunks {
                let mut current_batch = batch_writer.new_batch();

                let mut write_threshold = 0;
                for data_elem in chunk {
                    firestore
                        .fluent()
                        .update()
                        .in_col(collection_name)
                        .document_id(data_elem[id_key.clone()].as_str())
                        .object::<T>(&data_elem)
                        .add_to_batch(&mut current_batch);

                    if write_threshold > 99 && write_threshold % 100 == 0 {
                        let response = current_batch.write().await;
                        current_batch = batch_writer.new_batch();
                    } else {
                        write_threshold += 1
                    }
                }
                let response = current_batch.write().await;
                current_batch = batch_writer.new_batch();
            }

            return Ok("WRITE SUCCESSFUL...".to_string());
        }
        Err(err) => {
            return Err(err.to_string());
        }
    }
}

