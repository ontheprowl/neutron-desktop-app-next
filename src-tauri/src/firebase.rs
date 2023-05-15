use std::{ sync::Mutex};

use super::models;

use firestore::*;
use gcloud_sdk::GCP_DEFAULT_SCOPES;
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
                    handle.manage(models::DB{
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
