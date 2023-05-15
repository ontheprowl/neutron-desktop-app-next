use std::{any::Any, collections::HashMap, fmt};

use prost_types::Value;
use serde::{Deserialize, Serialize};

use crate::utils;

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct NeutronInvoice {
    pub(crate) invoice_id: String,
    pub(crate) date: String,
    pub(crate) due_date: String,
    pub(crate) due_days: i32,
    pub(crate) status: String,
    pub(crate) invoice_number: String,
    pub(crate) company_name: String,
    pub(crate) customer_name: String,
    pub(crate) customer_id: String,
    pub(crate) total: i32,
    pub(crate) balance: i32,
    pub(crate) payment_terms: String,
    pub(crate) payment_terms_label: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct Receipt {
    pub(crate) receipt_id: String,
    pub(crate) date: String,
    pub(crate) receipt_number: String,
    pub(crate) customer_name: String,
    pub(crate) valid: String,
    pub(crate) entries: ReceiptEntries,
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct Group {
    pub(crate) alter_id: String, // Tally - ALTERID
    pub(crate) positive: bool,   // Tally - GROUP_POSITIVE
    pub(crate) id: String,       // Tally - GUID
    pub(crate) name: String,     // Tally - NAME
    pub(crate) parent: String,   // Tally - PARENT
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct Ledger {
    pub(crate) address: String, // Tally - ADDRESS
    // pub(crate) alter_id: String, // Tally - ALTERID
    // "BILLCREDITPERIOD": null,
    pub(crate) closing_balance: String, // Tally - CLOSINGBALANCE
    pub(crate) contact: String,         // Tally - CREDFLOW_LEDGER_CONTACT_PERSON
    pub(crate) country: String,         // Tally - CREDFLOW_LEDGER_COUNTRY
    pub(crate) email: String,           // Tally - CREDFLOW_LEDGER_EMAIL
    pub(crate) email_cc: String,        // Tally - CREDFLOW_LEDGER_EMAIL_CC
    pub(crate) fax: String,             // Tally - CREDFLOW_LEDGER_FAX
    pub(crate) mobile: String,          // Tally - CREDFLOW_LEDGER_MOBILE
    pub(crate) phone: String,           // Tally - CREDFLOW_LEDGER_PHONE
    pub(crate) state: String,           // Tally - CREDFLOW_LEDGER_STATE
    pub(crate) pincode: String,         // Tally - PINCODE
    pub(crate) website: String,         // Tally- CREDFLOW_LEDGER_WEBSITE
    pub(crate) from: String,            // Tally - FROMDATE
    pub(crate) to: String,              // Tally - TODATE
    pub(crate) gst: String,             // Tally - GSTIN
    pub(crate) gst_type: String,        // Tally - GSTREGISTRATIONTYPE
    pub(crate) id: String,              // Tally - GUID
    pub(crate) hsn: String,             // Tally - HSNCODE
    pub(crate) hsn_desc: String,        // Tally - HSNDESCRIPTION
    pub(crate) itn: String,             // Tally - INCOMETAXNUMBER
    pub(crate) is_cb_debit: bool,       // Tally - ISCBDEBIT
    pub(crate) is_ob_debit: bool,       // Tally - ISOBDEBIT
    pub(crate) is_tds_applicable: bool, // Tally - ISTDSAPPLICABLE
    pub(crate) ledger_details: LedgerPendingDetails,
    pub(crate) name: String, // Tally - NAME

                             // "ISTDSAPPLICABLE": "No",

                             // "LEDGER_ROTC": "0",
                             // "OPENINGBALANCE": "0.00",
                             // "PARENT": "Employee Benefit Expenses",
                             // "PINCODE": null,
                             // "SALESTAXNUMBER": null,
                             // "TDSDEDUCTEETYPE": null,
                             // "VATTIN": null
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct Invoice {
    pub(crate) alter_id: String,       // Tally - ALTERID
    pub(crate) invoice_id: String,     // Tally - VOUCHERGUID
    pub(crate) invoice_number: String, // Tally - VOUCHERNUMBER
    pub(crate) buyer: InvoiceBuyerDetails,
    pub(crate) consignee: InvoiceConsigneeDetails,
    pub(crate) customer_name: String, // Tally - PARTYNAME
    pub(crate) date: String,          // Tally - DATE
    pub(crate) payment_terms: String, // Tally - CREDITPERIOD
    pub(crate) cancelled: bool,       // Tally - VOUCHER_CANCELLED
    pub(crate) ref_id: String,        // Tally - REF
    pub(crate) notes: String,         // Tally - NARRATION,
    pub(crate) entries: Vec<InvoiceLedgerEntry>,
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct InvoiceLedgerEntry {
    pub(crate) name: String,
    pub(crate) amount: f32,
    pub(crate) positive: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct InvoiceBuyerDetails {
    pub(crate) address: String,         // Tally - BUYERADDRESS
    pub(crate) country: String,         // Tally - BUYERCOUNTRY
    pub(crate) cst_no: String,          // Tally - BUYERCSTNUMBER
    pub(crate) place_of_supply: String, // Tally - BUYERPLACEOFSUPPLY
    pub(crate) state: String,           // Tally - BUYERSTATENAME
    pub(crate) order_date: String,      // Tally - BUYERORDERDATE
    pub(crate) order_number: String,    // Tally - BUYERORDERNUMBER
    pub(crate) sales_tax_no: String,    // Tally - BUYERSALESTAXNO
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct InvoiceConsigneeDetails {
    pub(crate) address: String, // Tally - CONSIGNEEADDRESS
    pub(crate) cst_no: String,  // Tally - CONSIGNEECSTNUMBER
    pub(crate) gst: String,     // Tally - CONSIGNEEGST
    pub(crate) state: String,   // Tally - CONSIGNEESTATE
    pub(crate) name: String,    // Tally - CONSIGNEENAME
}

impl From<HashMap<String, String>> for Invoice {
    fn from(invoice_data: HashMap<String, String>) -> Self {
        let ledger_names = invoice_data.get("LEDGER_NAME").unwrap().to_string();
        let ledger_amounts = invoice_data.get("LEDGER_AMOUNT").unwrap().to_string();
        let ledger_positive = invoice_data.get("LEDGER_POSITIVE").unwrap().to_string();

        let ledger_name_parts: Vec<&str> = ledger_names
            .split_terminator("^")
            .collect::<Vec<&str>>()
            .to_owned();
        let ledger_amount_parts: Vec<f32> = ledger_amounts
            .split_terminator("^")
            .into_iter()
            .map(|val| -> f32 {
                let trimmed_part: String = val.trim().replace(',', "");
                return trimmed_part.parse::<f32>().unwrap();
            })
            .collect::<Vec<f32>>()
            .to_owned();
        let ledger_positive_parts = ledger_positive
            .split_terminator("^")
            .into_iter()
            .map(|val| -> bool {
                match val {
                    "Yes" => {
                        return true;
                    }

                    "No" => {
                        return false;
                    }

                    &_ => false,
                }
            })
            .collect::<Vec<bool>>();

        let entries = (0..ledger_name_parts.len())
            .into_iter()
            .map(|imc| -> InvoiceLedgerEntry {
                return InvoiceLedgerEntry {
                    name: ledger_name_parts.get(imc).unwrap().to_string(),
                    amount: ledger_amount_parts.get(imc).unwrap().to_owned(),
                    positive: ledger_positive_parts.get(imc).unwrap().to_owned(),
                };
            }).collect::<Vec<InvoiceLedgerEntry>>();

        let voucher_cancelled: String =
            utils::get_from_map_safe(&invoice_data, "VOUCHER_CANCELLED");

        let voucher_cancelled_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&voucher_cancelled);

        return Invoice {
            alter_id: utils::get_from_map_safe(&invoice_data, "ALTERID"),
            invoice_id: utils::get_from_map_safe(&invoice_data, "VOUCHERGUID"),
            invoice_number: utils::get_from_map_safe(&invoice_data, "VOUCHERNUMBER"),
            buyer: InvoiceBuyerDetails {
                address: utils::get_from_map_safe(&invoice_data, "BUYERADDRESS"),
                country: utils::get_from_map_safe(&invoice_data, "BUYERCOUNTRY"),
                cst_no: utils::get_from_map_safe(&invoice_data, "BUYERCSTNUMBER"),
                place_of_supply: utils::get_from_map_safe(&invoice_data, "BUYERPLACEOFSUPPLY"),
                state: utils::get_from_map_safe(&invoice_data, "BUYERCSTNUMBER"),
                order_date: utils::get_from_map_safe(&invoice_data, "BUYERORDERDATE"),
                order_number: utils::get_from_map_safe(&invoice_data, "BUYERORDERNUMBER"),
                sales_tax_no: utils::get_from_map_safe(&invoice_data, "BUYERSALESTAXNO"),
            },
            consignee: InvoiceConsigneeDetails {
                address: utils::get_from_map_safe(&invoice_data, "CONSIGNEEADDRESS"),
                cst_no: utils::get_from_map_safe(&invoice_data, "CONSIGNEECSTNUMBER"),
                gst: utils::get_from_map_safe(&invoice_data, "CONSIGNEEGST"),
                state: utils::get_from_map_safe(&invoice_data, "CONSIGNEESTATE"),
                name: utils::get_from_map_safe(&invoice_data, "CONSIGNEENAME"),
            },
            customer_name: utils::get_from_map_safe(&invoice_data, "CONSIGNEENAME"),
            date: utils::get_from_map_safe(&invoice_data, "DATE"),
            payment_terms: utils::get_from_map_safe(&invoice_data, "CREDITPERIOD"),
            cancelled: voucher_cancelled_bool.to_owned(),
            ref_id: utils::get_from_map_safe(&invoice_data, "REFERENCE"),
            notes: utils::get_from_map_safe(&invoice_data, "NARRATION"),
            entries: entries,
        };
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct LedgerPendingDetails {
    pub(crate) has_pending_bills: bool, // Tally - LEDGER_PENDING_BILLS
    pub(crate) pending_credit_period: String, // Tally - LEDGER_PENDING_CREDITPERIOD
    pub(crate) pending_date: String,    // Tally - LEDGER_PENDING_DATE
    pub(crate) pending_is_dr: String,   // Tally - LEDGER_PENDING_ISDR
    pub(crate) positive: bool,          // Tally - LEDGER_POSITIVE
}

impl From<HashMap<String, String>> for Ledger {
    fn from(ledger_data: HashMap<String, String>) -> Self {
        let is_cb_debit: String = utils::get_from_map_safe(&ledger_data, "ISCBDEBIT");
        let is_ob_debit: String = utils::get_from_map_safe(&ledger_data, "ISOBDEBIT");
        let is_tds_applicable: String = utils::get_from_map_safe(&ledger_data, "ISTDSAPPLICABLE");

        let has_pending_bills: String =
            utils::get_from_map_safe(&ledger_data, "LEDGER_PENDING_BILLS");
        let positive: String = utils::get_from_map_safe(&ledger_data, "LEDGER_POSITIVE");

        let is_cb_debit_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&is_cb_debit);

        let is_ob_debit_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&is_ob_debit);

        let is_tds_applicable_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&is_tds_applicable);

        let has_pending_bills_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&has_pending_bills);

        let positive_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&positive);

        return Ledger {
            address: utils::get_from_map_safe(&ledger_data, "ADDRESS"),
            closing_balance: utils::get_from_map_safe(&ledger_data, "CLOSINGBALANCE"),
            contact: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_CONTACT_PERSON"),
            country: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_COUNTRY"),
            email: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_EMAIL"),
            email_cc: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_EMAIL_CC"),
            fax: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_FAX"),
            mobile: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_MOBILE"),
            phone: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_PHONE"),
            state: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_STATE"),
            pincode: utils::get_from_map_safe(&ledger_data, "PINCODE"),
            website: utils::get_from_map_safe(&ledger_data, "CREDFLOW_LEDGER_WEBSITE"),
            from: utils::get_from_map_safe(&ledger_data, "FROMDATE"),
            to: utils::get_from_map_safe(&ledger_data, "TODATE"),
            gst: utils::get_from_map_safe(&ledger_data, "GSTIN"),
            gst_type: utils::get_from_map_safe(&ledger_data, "GSTREGISTRATIONTYPE"),
            id: utils::get_from_map_safe(&ledger_data, "GUID"),
            hsn: utils::get_from_map_safe(&ledger_data, "HSNCODE"),
            hsn_desc: utils::get_from_map_safe(&ledger_data, "HSNDESCRIPTION"),
            itn: utils::get_from_map_safe(&ledger_data, "INCOMETAXNUMBER"),
            is_cb_debit: is_cb_debit_bool.to_owned(),
            is_ob_debit: is_ob_debit_bool.to_owned(),
            is_tds_applicable: is_tds_applicable_bool.to_owned(),
            ledger_details: LedgerPendingDetails {
                has_pending_bills: has_pending_bills_bool.to_owned(),
                pending_credit_period: utils::get_from_map_safe(
                    &ledger_data,
                    "LEDGER_PENDING_CREDITPERIOD",
                ),
                pending_date: utils::get_from_map_safe(&ledger_data, "LEDGER_PENDING_DATE"),
                pending_is_dr: utils::get_from_map_safe(&ledger_data, "LEDGER_PENDING_ISDR"),
                positive: positive_bool.to_owned(),
            },
            name: utils::get_from_map_safe(&ledger_data, "NAME"),
            ..Ledger::default()
        };
    }
}

impl From<HashMap<String, String>> for Group {
    fn from(processed_group: HashMap<String, String>) -> Self {
        let group_positive: String = processed_group.get("GROUP_POSITIVE").unwrap().to_string();

        let group_positive_bool = |val| -> bool {
            match val {
                "Yes" => {
                    return true;
                }

                "No" => {
                    return false;
                }

                &_ => false,
            }
        }(&group_positive);

        return Group {
            alter_id: processed_group.get("ALTERID").unwrap().to_string(),
            positive: group_positive_bool.to_owned(),
            id: processed_group.get("GUID").unwrap().to_string(),
            name: processed_group.get("NAME").unwrap().to_string(),
            parent: processed_group.get("PARENT").unwrap().to_string(),
        };
    }
}

impl From<HashMap<String, String>> for Receipt {
    fn from(processed_receipt: HashMap<String, String>) -> Self {
        let ledger_names = processed_receipt.get("LEDGER_NAME").unwrap().to_string();
        let ledger_amounts = processed_receipt.get("LEDGER_AMOUNT").unwrap().to_string();

        let ledger_positive = processed_receipt
            .get("LEDGER_POSITIVE")
            .unwrap()
            .to_string();

        let ledger_name_parts: Vec<&str> = ledger_names
            .split_terminator("^")
            .collect::<Vec<&str>>()
            .to_owned();
        let ledger_amount_parts: Vec<f32> = ledger_amounts
            .split_terminator("^")
            .into_iter()
            .map(|val| -> f32 {
                let trimmed_part: String = val.trim().replace(',', "");
                return trimmed_part.parse::<f32>().unwrap();
            })
            .collect::<Vec<f32>>()
            .to_owned();
        let ledger_positive_parts = ledger_positive
            .split_terminator("^")
            .into_iter()
            .map(|val| -> bool {
                match val {
                    "Yes" => {
                        return true;
                    }

                    "No" => {
                        return false;
                    }

                    &_ => false,
                }
            })
            .collect::<Vec<bool>>();

        return Receipt {
            receipt_id: processed_receipt.get("GUID").unwrap().to_string(),
            date: processed_receipt.get("DATE").unwrap().to_string(),
            receipt_number: processed_receipt.get("VOUCHERNUMBER").unwrap().to_string(),
            customer_name: processed_receipt.get("PARTYNAME").unwrap().to_string(),
            entries: ReceiptEntries {
                debited: ledger_name_parts.get(0).unwrap().to_string(),
                credited: ledger_name_parts.get(1).unwrap().to_string(),
                debit_amount: ledger_amount_parts.get(0).unwrap().to_owned(),
                credit_amount: ledger_amount_parts.get(1).unwrap().to_owned(),
                debited_ledger_positive: ledger_positive_parts.get(0).unwrap().to_owned(),
                credited_ledger_positive: ledger_positive_parts.get(1).unwrap().to_owned(),
            },
            valid: processed_receipt
                .get("VOUCHER_CANCELLED")
                .unwrap()
                .to_string(),
        };
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct ReceiptEntries {
    pub(crate) debited: String,
    pub(crate) credited: String,
    pub(crate) debit_amount: f32,
    pub(crate) credit_amount: f32,
    pub(crate) debited_ledger_positive: bool,
    pub(crate) credited_ledger_positive: bool,
}

impl fmt::Display for Invoice {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.invoice_number, self.customer_name)
    }
}

#[derive(Debug, Deserialize, Serialize, Clone)]
enum Invoices {
    Singleton(Invoice),
    Many(Vec<Invoice>),
}
