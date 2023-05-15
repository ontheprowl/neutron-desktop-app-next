use std::{any::TypeId, collections::HashMap};

use serde_json::Value;
use tauri::State;

use crate::{
    models::{self, Params},
    tally::{models::*, transforms::*},
};

pub fn get_from_map_safe(map: &HashMap<String, String>, key: &str) -> String {
    return map.get(key).unwrap_or(&("".to_string())).to_string();
}

pub fn get_tally_uri_from_state(state : State<Params>) -> String {

    let params_ref = state.0.lock().unwrap();
    let host = params_ref.get("host");
    let port = params_ref.get("port");
    let mut tally_uri: String = "http://localhost:9000".to_string();
    if host.is_some() && port.is_some() {
        println!("The host and port name value are : {} {}",host.unwrap(),port.unwrap());
        tally_uri = format!(r#"http://{}:{}"#, host.unwrap(), port.unwrap());
    }
    return tally_uri.clone();
}

// pub fn tally_json_to_result_vector<T>(tally_result: &Value) -> Vec<T> {
//     let json_value = tally_result.clone();
//     let mut result_vec: Vec<Invoice> = Vec::new();
//     if json_value.is_array() {
//         let invoices: Vec<HashMap<String, Value>> = serde_json::from_value(json_value).unwrap();
//         let transformed_invoices = invoices
//             .into_iter()
//             .map(|val| -> Invoice {
//                 return to_invoice(val);
//             })
//             .collect::<Vec<Invoice>>();
//         result_vec = transformed_invoices.clone();
//         return result_vec;
//     } else {
//         let invoice: HashMap<String, Value> = serde_json::from_value(json_value).unwrap();
//         result_vec.push(to_invoice(invoice));
//         return result_vec;
//     }
// }

// fn retrieve_transform_for_generic<T>() -> impl Fn(HashMap<String, Value>) -> T {
//         return Box::new(|val: HashMap<String, Value>| to_invoice(val));
//     } else {
//         return Box::new(|val: HashMap<String, Value>| to_invoice(val));
//     }
// }
