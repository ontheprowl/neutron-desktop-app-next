use chrono::{Days, NaiveDate, Utc};
use serde_json::Value;
use std::collections::HashMap;

use super::models::{self, Invoice, ReceiptDetails};

pub fn to_receipt(receipt: HashMap<String, Value>) -> models::Receipt {
    let processed_receipt = to_non_null_map(receipt);
    let receipt = models::Receipt::from(processed_receipt);
    return receipt.to_owned();
}

pub fn to_receipt_details(receipt: HashMap<String, Value>) -> models::ReceiptDetails {
    let processed_receipt = to_non_null_map(receipt);
    let receipt = models::ReceiptDetails::from(processed_receipt);
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

// * Hard requirement for the refs to be consistent across Sales and Receipt vouchers in order for the matching to be done.
// ? Can this be implemented in an alternate way
pub fn reconcile_invoices_and_receipts(
    invoices: &mut Vec<models::Invoice>,
    receipts_details: &mut Vec<models::ReceiptDetails>,
) {
    for mut invoice in invoices {
        let mut new_balance: f32 = invoice.balance;

        let matching_receipts: Vec<&ReceiptDetails> = receipts_details
            .iter()
            .filter(|receipt_detail| {
                return receipt_detail.bill_type == "Agst Ref"
                    && receipt_detail.bill_ref == invoice.invoice_number;
            })
            .collect::<Vec<&ReceiptDetails>>();
        for receipt in matching_receipts {
            new_balance = new_balance - receipt.bill_amount;
        }
        if new_balance == 0.0 {
            invoice.status = "paid".to_string();
        } else if new_balance == invoice.balance {
            invoice.status = "overdue".to_string();
        } else {
            invoice.status = "partially_paid".to_string();
        }
        invoice.balance = new_balance;
    }
}

pub fn calc_ledger_outstandings(
    invoices: &mut Vec<models::Invoice>,
    ledgers: &mut Vec<models::Ledger>,
) {
    for ledger in ledgers {
        let matching_invoices = invoices
            .clone()
            .into_iter()
            .filter(|invoice| {
                return invoice.customer_name == ledger.name;
            })
            .collect::<Vec<models::Invoice>>();
        println!("{:?}", matching_invoices);
        for invoice in matching_invoices {
            match invoice.status.as_str() {
                "paid" => {
                    ledger.revenue += invoice.total;
                    continue;
                }
                "partially_paid" => {
                    ledger.revenue += invoice.total - invoice.balance;
                }

                &_ => {},
            }
            ledger.outstanding_receivable_amount += invoice.balance;
            ledger.outstanding += invoice.balance;
        }
        ledger.dso = (ledger.outstanding / ledger.revenue) as i32 * 30;
    }
}

pub fn normalize_ledgers_data(
    ledgers: &mut Vec<models::Ledger>,
    invoices: &mut Vec<models::Invoice>,
) {
    for ledger in ledgers {
        let matched_invoices = invoices
            .into_iter()
            .filter(|invoice| {
                return invoice.customer_name == ledger.name;
            })
            .collect::<Vec<&mut Invoice>>();
        matched_invoices.into_iter().for_each(|mut invoice| {
            invoice.customer_id = ledger.contact_id.clone();
        });
    }
}

fn generate_dates_for_comparison(invoice: &models::Invoice, days: Vec<u64>) -> Vec<NaiveDate> {
    // println!("INVOICE IS : {:?}",invoice);
    let now = Utc::now();
    let mut result = Vec::new();
    let invoice_date =
        chrono::NaiveDate::parse_from_str(invoice.date.as_str(), "%d-%b-%y").unwrap();
    result.push(invoice_date);
    for reference in days {
        result.push(
            now.checked_sub_days(Days::new(reference))
                .unwrap()
                .date_naive(),
        );
    }

    return result.clone();
}

pub fn invoices_last_30_days_filter(invoice: &models::Invoice) -> bool {
    let dates = generate_dates_for_comparison(invoice, vec![30]);
    return dates[0].ge(&dates[1]);
}

pub fn invoices_last_60_days_filter(invoice: &models::Invoice) -> bool {
    let dates = generate_dates_for_comparison(invoice, vec![61, 30]);
    return dates[0].ge(&dates[1]) && dates[0].le(&dates[2]);
}

pub fn invoices_last_90_days_filter(invoice: &models::Invoice) -> bool {
    let dates = generate_dates_for_comparison(invoice, vec![91, 60]);
    return dates[0].ge(&dates[1]) && dates[0].le(&dates[2]);
}

pub fn invoices_beyond_90_days_filter(invoice: &models::Invoice) -> bool {
    let dates = generate_dates_for_comparison(invoice, vec![90]);
    return dates[0].le(&dates[1]);
}
