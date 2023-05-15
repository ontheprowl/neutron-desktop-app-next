use serde_json::Value;
use std::collections::HashMap;

use super::models;

pub fn to_receipt(receipt: HashMap<String, Value>) -> models::Receipt {
    let processed_receipt = to_non_null_map(receipt);
    let receipt = models::Receipt::from(processed_receipt);
    return receipt.to_owned();
}

pub fn to_group(group: HashMap<String, Value>) -> models::Group {
    let processed_group = to_non_null_map(group);
    let group = models::Group::from(processed_group);
    return group.to_owned();
}

pub fn to_ledger(ledger: HashMap<String, Value>) -> models::Ledger {
    let processed_ledger = to_non_null_map(ledger);
    let ledger_value: models::Ledger = models::Ledger::from(processed_ledger);
    return ledger_value.to_owned();
}

pub fn to_invoice(invoice: HashMap<String, Value>) -> models::Invoice {
    let processed_invoice = to_non_null_map(invoice);
    let invoice_value: models::Invoice = models::Invoice::from(processed_invoice);
    return invoice_value.to_owned();
}

pub fn to_non_null_map(map_with_nulls: HashMap<String, Value>) -> HashMap<String, String> {
    return map_with_nulls
        .into_iter()
        .filter_map(|entry: (String, Value)| -> Option<(String, String)> {
            let value: Option<&str> = entry.1.as_str();
            match value {
                Some(str) => {
                    return Some((entry.0, value.unwrap().trim_matches('"').to_string()));
                }

                None => None,
            }
        })
        .collect::<HashMap<String, String>>();
}
