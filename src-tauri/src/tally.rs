pub(crate) mod models;
pub(crate) mod transforms;

#[macro_use]
mod constants;
use std::{collections::HashMap, fmt};

use ::serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tauri::State;

use crate::{
    firebase::{access_firestore, write_batched_to_firestore},
    models::Params,
    tally::transforms::{to_group, to_invoice, to_ledger, to_receipt},
    utils::get_tally_uri_from_state,
};
use chrono::*;

use self::{models::Invoice, transforms::to_receipt_details};

#[tauri::command]
pub fn get_tally_companies(params: State<Params>) -> serde_json::Value {
    let tally_uri = get_tally_uri_from_state(params);
    let resp = reqwest::blocking::Client::new().post(tally_uri.to_owned()).body("<ENVELOPE>\r\n    <HEADER>\r\n        <VERSION>1</VERSION>\r\n        <TALLYREQUEST>Export</TALLYREQUEST>\r\n        <TYPE>Data</TYPE>\r\n        <ID>CredFlow_CompanyReport</ID>\r\n    </HEADER>\r\n    <BODY>\r\n        <DESC>\r\n            <STATICVARIABLES>\r\n                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>\r\n            </STATICVARIABLES>\r\n            <TDL>\r\n                <TDLMESSAGE>\r\n                    <REPORT NAME=\'CredFlow_CompanyReport\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <FORMS>CredFlow_CompanyForm</FORMS>\r\n                    </REPORT>\r\n                    <FORM NAME=\'CredFlow_CompanyForm\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <TOPPARTS>CredFlow_CompanyPart</TOPPARTS>\r\n                    </FORM>\r\n                    <PART NAME=\'CredFlow_CompanyPart\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <TOPLINES>CredFlow_CompanyLine</TOPLINES>\r\n                        <REPEAT>CredFlow_CompanyLine: CredFlow_CompanyMasters</REPEAT>\r\n                        <SCROLLED>Vertical</SCROLLED>\r\n                    </PART>\r\n                    <LINE NAME=\'CredFlow_CompanyLine\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <LEFTFIELDS>CredFlow_company_name, CredFlow_company_formal_name, CredFlow_company_guid, CredFlow_address, CredFlow_Country, CredFlow_state, CredFlow_pincode, CredFlow_CompanyBooksFrom, CredFlow_phone, CredFlow_Mobile, CredFlow_fax, CredFlow_company_email, CredFlow_company_website, CredFlow_company_last_voucher_date, CredFlow_cmpvchalterid, CredFlow_altmasterid</LEFTFIELDS>\r\n                        <XMLTAG>&quot;Companies&quot;</XMLTAG>\r\n                    </LINE>\r\n                    <FIELD NAME=\'CredFlow_state\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;State&quot;</XMLTAG>\r\n                        <SET>$statename</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_address\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Address&quot;</XMLTAG>\r\n                        <SET>$$FullListEx:&quot;^&quot;:address:$address</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_pincode\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Pincode&quot;</XMLTAG>\r\n                        <SET>$pincode</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_CompanyBooksFrom\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;booksFrom&quot;</XMLTAG>\r\n                        <SET>$booksfrom</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_Country\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Country&quot;</XMLTAG>\r\n                        <SET>$countryname</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_Mobile\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;mobile&quot;</XMLTAG>\r\n                        <SET>$mobilenumbers</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_formal_name\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Formal name&quot;</XMLTAG>\r\n                        <SET>$basiccompanyformalname</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_phone\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;phone&quot;</XMLTAG>\r\n                        <SET>$phonenumber</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_fax\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;fax&quot;</XMLTAG>\r\n                        <SET>$faxnumber</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_email\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company email&quot;</XMLTAG>\r\n                        <SET>$email</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_website\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Website&quot;</XMLTAG>\r\n                        <SET>$website</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_last_voucher_date\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Last Voucher Date&quot;</XMLTAG>\r\n                        <SET>$lastvoucherdate</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_guid\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Guid&quot;</XMLTAG>\r\n                        <SET>$guid</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_name\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company&quot;</XMLTAG>\r\n                        <SET>$name</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_cmpvchalterid\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;cmpvchalterid&quot;</XMLTAG>\r\n                        <SET>$altvchid</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_altmasterid\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;altMasterId&quot;</XMLTAG>\r\n                        <SET>$altmstid</SET>\r\n                    </FIELD>\r\n                    <COLLECTION NAME=\'CredFlow_CompanyMasters\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <TYPE>company</TYPE>\r\n                        <BELONGSTO>Yes</BELONGSTO>\r\n                    </COLLECTION>\r\n                </TDLMESSAGE>\r\n            </TDL>\r\n        </DESC>\r\n    </BODY>\r\n</ENVELOPE>").send();

    let resp_gst_request = reqwest::blocking::Client::new()
        .post(tally_uri.to_owned())
        .body(TALLY_GET_COMPANY_GST_DETAILS!())
        .send();

    if resp.is_ok() && resp_gst_request.is_ok() {
        let raw_xml = format!(r#"{}"#, resp.unwrap().text().unwrap());

        let raw_xml_gst_details = format!(r#"{}"#, resp_gst_request.unwrap().text().unwrap());

        let company_details_json = &xmltojson::to_json(&raw_xml).unwrap()["ENVELOPE"]["COMPANIES"];
        let gst_details_json =
            &xmltojson::to_json(&raw_xml_gst_details).unwrap()["ENVELOPE"]["GSTDETAILS"];

        return json!({
            "company_details":company_details_json,
            "gst_details" : gst_details_json
        });
    } else {
        return json!({
            "status":-1,
            "message":"Tally not reachable",
        });
    }
}

#[tauri::command]
pub fn ping(params: State<Params>, host: &str, port: &str) -> serde_json::Value {
    let tally_uri = format!(r#"http://{}:{}"#, host, port);

    let resp = reqwest::blocking::Client::new()
        .post(tally_uri)
        .body(TALLY_LICENSE_INFO_REQUEST!())
        .send();

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().unwrap());
            let mut params_map = params.0.lock().unwrap();
            params_map.insert("host".to_string(), host.to_string());
            params_map.insert("port".to_string(), port.to_string());

            return json!({"status":0,
               "data":xmltojson::to_json(&raw_xml).unwrap(),
            });
        }
        Err(_) => {
            return json!({
                "status":-1,
                "message":"Tally not reachable",
            })
        }
    }
}

async fn get_company_groups(
    tally_uri: &String,
    company_guid: &String,
    company_name: &String,
) -> Result<Vec<models::Group>, String> {
    let resp = reqwest::Client::new()
        .post(tally_uri)
        .body(format!(
            CREDFLOW_TALLY_GROUPS_REQUEST!(),
            company_guid, company_name
        ))
        .send()
        .await;

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().await.unwrap());
            let result = &xmltojson::to_json(&raw_xml).unwrap()["ENVELOPE"]["GROUPS"];
            let json_value = result.clone();
            let mut result_vec: Vec<models::Group> = Vec::new();
            if json_value.is_array() {
                println!("IS AN ARRAY");
                let groups: Vec<HashMap<String, Value>> =
                    serde_json::from_value(json_value).unwrap();
                let transformed_groups = groups
                    .into_iter()
                    .map(|val| to_group(val))
                    .collect::<Vec<models::Group>>();
                result_vec = transformed_groups;
            } else {
                println!("IS A SINGLE VALUE");
                let group: HashMap<String, Value> = serde_json::from_value(json_value).unwrap();
                result_vec.push(to_group(group));
            }

            return Ok(result_vec);
        }

        Err(err) => Err("Groups could not be retrieved. Reason:".to_owned() + &err.to_string()),
    }
}

async fn get_ledgers_for_company(
    tally_uri: &String,
    company_guid: &String,
    company_name: &String,
) -> Result<Vec<models::Ledger>, String> {
    let resp = reqwest::Client::new()
        .post(tally_uri)
        .body(format!(
            CREDFLOW_TALLY_LEDGERS_REQUEST!(),
            &company_guid, &company_name
        ))
        .send()
        .await;

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().await.unwrap());
            let result = &xmltojson::to_json(&raw_xml).unwrap()["ENVELOPE"]["LEDGERS"];
            let json_value = result.clone();
            let mut result_vec: Vec<models::Ledger> = Vec::new();
            if json_value.is_array() {
                let ledgers: Vec<HashMap<String, Value>> =
                    serde_json::from_value(json_value).unwrap();
                let transformed_ledgers = ledgers
                    .into_iter()
                    .map(|val| to_ledger(val))
                    .collect::<Vec<models::Ledger>>();
                result_vec = transformed_ledgers;
            } else {
                let ledger: HashMap<String, Value> = serde_json::from_value(json_value).unwrap();
                result_vec.push(to_ledger(ledger));
            }
            return Ok(result_vec);
        }

        Err(err) => Err("Ledgers could not be retrieved. Reason:".to_owned() + &err.to_string()),
    }
}

async fn get_invoices_for_company(
    tally_uri: &String,

    company_guid: &String,
    company_name: &String,
) -> Result<Vec<models::Invoice>, String> {
    let resp = reqwest::Client::new()
        .post(tally_uri)
        .body(format!(
            CREDFLOW_TALLY_INVOICES_REQUEST!(),
            &company_guid, &company_name
        ))
        .send()
        .await;

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().await.unwrap());
            let result = &xmltojson::to_json(&raw_xml).unwrap()["ENVELOPE"]["SALES"];
            let json_value = result.clone();
            let mut result_vec: Vec<models::Invoice> = Vec::new();
            if json_value.is_array() {
                let invoices: Vec<HashMap<String, Value>> =
                    serde_json::from_value(json_value).unwrap();
                let transformed_invoices = invoices
                    .into_iter()
                    .map(|val| to_invoice(val))
                    .collect::<Vec<models::Invoice>>();
                result_vec = transformed_invoices.clone();
            } else {
                let invoice: HashMap<String, Value> = serde_json::from_value(json_value).unwrap();
                result_vec.push(to_invoice(invoice));
            }
            return Ok(result_vec);
        }

        Err(err) => Err("Invoices could not be retrieved. Reason:".to_owned() + &err.to_string()),
    }
}

async fn get_receipts_for_company(
    tally_uri: &String,

    company_guid: &String,
    company_name: &String,
) -> Result<Vec<models::Receipt>, String> {
    let resp = reqwest::Client::new()
        .post(tally_uri)
        .body(format!(
            CREDFLOW_TALLY_RECEIPTS_REQUEST!(),
            &company_guid, &company_name
        ))
        .send()
        .await;

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().await.unwrap());
            let result = &xmltojson::to_json(&raw_xml).unwrap()["ENVELOPE"]["RECEIPTS"];
            let json_value = result.clone();
            let mut result_vec: Vec<models::Receipt> = Vec::new();
            if json_value.is_array() {
                let receipts: Vec<HashMap<String, Value>> =
                    serde_json::from_value(json_value).unwrap();
                let transformed_receipts = receipts
                    .into_iter()
                    .map(|val| to_receipt(val))
                    .collect::<Vec<models::Receipt>>();
                result_vec = transformed_receipts;
            } else {
                println!("IS A SINGLE VALUE");
                let receipt: HashMap<String, Value> = serde_json::from_value(json_value).unwrap();
                result_vec.push(to_receipt(receipt));
            }

            return Ok(result_vec);
        }

        Err(err) => Err("Receipts could not be retrieved. Reason:".to_owned() + &err.to_string()),
    }
}

async fn get_receipt_details_for_company(
    tally_uri: &String,

    company_guid: &String,
    company_name: &String,
) -> Result<Vec<models::ReceiptDetails>, String> {
    let resp = reqwest::Client::new()
        .post(tally_uri)
        .body(format!(
            CREDFLOW_TALLY_RECEIPTS_DETAILED_REQUEST!(),
            &company_guid, &company_name
        ))
        .send()
        .await;

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().await.unwrap());
            let result = &xmltojson::to_json(&raw_xml).unwrap()["ENVELOPE"]["RECEIPTSDETAILED"];
            let json_value = result.clone();
            let mut result_vec: Vec<models::ReceiptDetails> = Vec::new();
            if json_value.is_array() {
                let receipts: Vec<HashMap<String, Value>> =
                    serde_json::from_value(json_value).unwrap();
                let transformed_receipts = receipts
                    .into_iter()
                    .map(|val| to_receipt_details(val))
                    .collect::<Vec<models::ReceiptDetails>>();
                result_vec = transformed_receipts;
            } else {
                println!("IS A SINGLE VALUE");
                let receipt: HashMap<String, Value> = serde_json::from_value(json_value).unwrap();
                result_vec.push(to_receipt_details(receipt));
            }

            return Ok(result_vec);
        }

        Err(err) => {
            Err("Receipts (Detailed) could not be retrieved. Reason:".to_owned() + &err.to_string())
        }
    }
}

#[derive(Serialize, Deserialize)]
struct Sample {
    id: i32,
    name: String,
}

impl fmt::Display for Sample {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.id, self.name)
    }
}

#[tauri::command]
pub async fn main_tally_sync(
    params: State<'_, Params>,
    handle: tauri::AppHandle,
    company_guid: String,
    company_name: String,
    business_id: String,
) -> Result<serde_json::Value, serde_json::Value> {
    let firestore = access_firestore(handle).await;
    let tally_uri = get_tally_uri_from_state(params);

    match firestore {
        Ok(firestore) => {
            println!("FIRESTORE INITIALIZED");

            let my_struct: Sample = Sample {
                name: "Test".to_string(),
                id: 42,
            };

            println!("TALKING TO TALLY");

            let groups: Result<Vec<models::Group>, String> =
                get_company_groups(&tally_uri, &company_guid, &company_name).await;
            let ledgers: Result<Vec<models::Ledger>, String> =
                get_ledgers_for_company(&tally_uri, &company_guid, &company_name).await;
            let receipts: Result<Vec<models::Receipt>, String> =
                get_receipts_for_company(&tally_uri, &company_guid, &company_name).await;

            let receipts_details: Result<Vec<models::ReceiptDetails>, String> =
                get_receipt_details_for_company(&tally_uri, &company_guid, &company_name).await;
            let invoices: Result<Vec<models::Invoice>, String> =
                get_invoices_for_company(&tally_uri, &company_guid, &company_name).await;

            let mut receipt_details_data = receipts_details.unwrap();
            let mut invoices_data: Vec<models::Invoice> = invoices.unwrap();
            let mut ledgers_data: Vec<models::Ledger> = ledgers.unwrap();

            // * TALLY DATA AGGREGATION PHASE COMPLETE. INSERT TRANSFORMATIONS BELOW.
            transforms::reconcile_invoices_and_receipts(
                &mut invoices_data,
                &mut receipt_details_data,
            );

            transforms::normalize_ledgers_data(&mut ledgers_data, &mut invoices_data);

            let mut receivables = invoices_data
                .clone()
                .into_iter()
                .filter(|invoice| invoice.status == "overdue" || invoice.status == "partially_paid")
                .collect::<Vec<Invoice>>();

            let mut paid = invoices_data
                .clone()
                .into_iter()
                .filter(|invoice| invoice.status == "paid")
                .collect::<Vec<Invoice>>();

            transforms::calc_ledger_outstandings(&mut receivables, &mut ledgers_data);

            let mut receivables_30 = receivables
                .clone()
                .into_iter()
                .filter(transforms::invoices_last_30_days_filter)
                .collect::<Vec<Invoice>>();
            let mut receivables_60 = receivables
                .clone()
                .into_iter()
                .filter(transforms::invoices_last_60_days_filter)
                .collect::<Vec<Invoice>>();
            let mut receivables_90 = receivables
                .clone()
                .into_iter()
                .filter(transforms::invoices_last_90_days_filter)
                .collect::<Vec<Invoice>>();
            let mut receivables_excess = receivables
                .clone()
                .into_iter()
                .filter(transforms::invoices_beyond_90_days_filter)
                .collect::<Vec<Invoice>>();

            let outstanding_30_days = receivables_30.iter().fold(0.0, |first, last: &Invoice| {
                if last.balance > 0.0 {
                    return first + last.balance;
                } else {
                    return first;
                }
            }) as i32;

            let outstanding_60_days = receivables_30
                .clone()
                .iter()
                .chain(&receivables_60)
                .collect::<Vec<&Invoice>>()
                .iter()
                .fold(0.0, |first, last: &&Invoice| {
                    if last.balance > 0.0 {
                        return first + last.balance;
                    } else {
                        return first;
                    }
                }) as i32;

            let outstanding_90_days = receivables_30
                .clone()
                .iter()
                .chain(&receivables_60)
                .chain(&receivables_90)
                .collect::<Vec<&Invoice>>()
                .iter()
                .fold(0.0, |first, last: &&Invoice| {
                    if last.balance > 0.0 {
                        return first + last.balance;
                    } else {
                        return first;
                    }
                }) as i32;

            let outstanding_excess = receivables.iter().fold(0.0, |first, last: &Invoice| {
                if last.balance > 0.0 {
                    return first + last.balance;
                } else {
                    return first;
                }
            }) as i32;

            let mut paid_30 = paid
                .clone()
                .into_iter()
                .filter(transforms::invoices_last_30_days_filter)
                .collect::<Vec<Invoice>>();
            let mut paid_60 = paid
                .clone()
                .into_iter()
                .filter(transforms::invoices_last_60_days_filter)
                .collect::<Vec<Invoice>>();
            let mut paid_90 = paid
                .clone()
                .into_iter()
                .filter(transforms::invoices_last_90_days_filter)
                .collect::<Vec<Invoice>>();
            let mut paid_excess = paid
                .clone()
                .into_iter()
                .filter(transforms::invoices_beyond_90_days_filter)
                .collect::<Vec<Invoice>>();

            let revenue_30_days = paid_30.iter().fold(0.0, |first, last: &Invoice| {
                if last.total > 0.0 {
                    return first + last.total;
                } else {
                    return first;
                }
            }) as i32;

            let revenue_60_days = paid_30
                .clone()
                .iter()
                .chain(&paid_60)
                .collect::<Vec<&Invoice>>()
                .iter()
                .fold(0.0, |first, last: &&Invoice| {
                    if last.total > 0.0 {
                        return first + last.total;
                    } else {
                        return first;
                    }
                }) as i32;

            let revenue_90_days = paid_30
                .clone()
                .iter()
                .chain(&paid_60)
                .chain(&paid_90)
                .collect::<Vec<&Invoice>>()
                .iter()
                .fold(0.0, |first, last: &&Invoice| {
                    if last.total > 0.0 {
                        return first + last.total;
                    } else {
                        return first;
                    }
                }) as i32;

            let revenue_excess = paid.iter().fold(0.0, |first, last: &Invoice| {
                if last.total > 0.0 {
                    return first + last.total;
                } else {
                    return first;
                }
            }) as i32;

            let receivables_30_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut receivables_30,
                format!("{}/{}/{}", "receivables", business_id.as_str(), "30d").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let receivables_60_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut receivables_60,
                format!("{}/{}/{}", "receivables", business_id.as_str(), "60d").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let receivables_90_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut receivables_90,
                format!("{}/{}/{}", "receivables", business_id.as_str(), "90d").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let receivables_excess_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut receivables_excess,
                format!("{}/{}/{}", "receivables", business_id.as_str(), "excess").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let paid_30_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut paid_30,
                format!("{}/{}/{}", "paid", business_id.as_str(), "30d").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let paid_60_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut paid_60,
                format!("{}/{}/{}", "paid", business_id.as_str(), "60d").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let paid_90_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut paid_90,
                format!("{}/{}/{}", "paid", business_id.as_str(), "90d").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            let paid_excess_result = write_batched_to_firestore::<models::Invoice>(
                &firestore,
                &mut paid_excess,
                format!("{}/{}/{}", "paid", business_id.as_str(), "excess").as_str(),
                500,
                "invoice_id".to_string(),
            )
            .await;

            println!("{:?}", ledgers_data);
            let ledgers_result = write_batched_to_firestore::<models::Ledger>(
                &firestore,
                &mut ledgers_data,
                format!("{}/{}/{}", "customers", "business", business_id.as_str()).as_str(),
                500,
                "contact_id".to_string(),
            )
            .await;

            let response = json!({
                "outstanding": {
                    "30d": outstanding_30_days, "60d": outstanding_60_days, "90d": outstanding_90_days, "excess": outstanding_excess, "total": outstanding_excess
                },
                "revenue": {
                    "30d": revenue_30_days, "60d": revenue_60_days, "90d": revenue_90_days,"excess": revenue_excess, "total": revenue_excess
                },
                "dso": {
                    "30d": if revenue_30_days > 0 { outstanding_30_days / revenue_30_days * 30 } else {0 },
                    "60d": if revenue_60_days > 0 { outstanding_30_days / revenue_30_days * 30 } else {0 },
                    "90d": if revenue_90_days > 0 { outstanding_30_days / revenue_30_days * 30 } else {0 },
                    "excess": if revenue_excess >0 { outstanding_30_days / revenue_30_days * 30 } else {0 },
                }
            });

            return Ok(json!({ 
                "status" : 0,
                "data" :response }));
        }

        Err(err) => {
            return Err(json!({ 
                "status" : 0,
                "data" :err.to_string() }))
        }
    }
}
