use serde_json::json;

#[tauri::command]
pub fn get_tally_companies() -> serde_json::Value {
    let resp = reqwest::blocking::Client::new().post("http://localhost:9000").body("<ENVELOPE>\r\n    <HEADER>\r\n        <VERSION>1</VERSION>\r\n        <TALLYREQUEST>Export</TALLYREQUEST>\r\n        <TYPE>Data</TYPE>\r\n        <ID>CredFlow_CompanyReport</ID>\r\n    </HEADER>\r\n    <BODY>\r\n        <DESC>\r\n            <STATICVARIABLES>\r\n                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>\r\n            </STATICVARIABLES>\r\n            <TDL>\r\n                <TDLMESSAGE>\r\n                    <REPORT NAME=\'CredFlow_CompanyReport\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <FORMS>CredFlow_CompanyForm</FORMS>\r\n                    </REPORT>\r\n                    <FORM NAME=\'CredFlow_CompanyForm\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <TOPPARTS>CredFlow_CompanyPart</TOPPARTS>\r\n                    </FORM>\r\n                    <PART NAME=\'CredFlow_CompanyPart\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <TOPLINES>CredFlow_CompanyLine</TOPLINES>\r\n                        <REPEAT>CredFlow_CompanyLine: CredFlow_CompanyMasters</REPEAT>\r\n                        <SCROLLED>Vertical</SCROLLED>\r\n                    </PART>\r\n                    <LINE NAME=\'CredFlow_CompanyLine\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <LEFTFIELDS>CredFlow_company_name, CredFlow_company_formal_name, CredFlow_company_guid, CredFlow_address, CredFlow_Country, CredFlow_state, CredFlow_pincode, CredFlow_CompanyBooksFrom, CredFlow_phone, CredFlow_Mobile, CredFlow_fax, CredFlow_company_email, CredFlow_company_website, CredFlow_company_last_voucher_date, CredFlow_cmpvchalterid, CredFlow_altmasterid</LEFTFIELDS>\r\n                        <XMLTAG>&quot;Companies&quot;</XMLTAG>\r\n                    </LINE>\r\n                    <FIELD NAME=\'CredFlow_state\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;State&quot;</XMLTAG>\r\n                        <SET>$statename</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_address\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Address&quot;</XMLTAG>\r\n                        <SET>$$FullListEx:&quot;^&quot;:address:$address</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_pincode\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Pincode&quot;</XMLTAG>\r\n                        <SET>$pincode</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_CompanyBooksFrom\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;booksFrom&quot;</XMLTAG>\r\n                        <SET>$booksfrom</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_Country\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Country&quot;</XMLTAG>\r\n                        <SET>$countryname</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_Mobile\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;mobile&quot;</XMLTAG>\r\n                        <SET>$mobilenumbers</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_formal_name\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Formal name&quot;</XMLTAG>\r\n                        <SET>$basiccompanyformalname</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_phone\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;phone&quot;</XMLTAG>\r\n                        <SET>$phonenumber</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_fax\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;fax&quot;</XMLTAG>\r\n                        <SET>$faxnumber</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_email\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company email&quot;</XMLTAG>\r\n                        <SET>$email</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_website\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Website&quot;</XMLTAG>\r\n                        <SET>$website</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_last_voucher_date\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Last Voucher Date&quot;</XMLTAG>\r\n                        <SET>$lastvoucherdate</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_guid\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company Guid&quot;</XMLTAG>\r\n                        <SET>$guid</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_company_name\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;Company&quot;</XMLTAG>\r\n                        <SET>$name</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_cmpvchalterid\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;cmpvchalterid&quot;</XMLTAG>\r\n                        <SET>$altvchid</SET>\r\n                    </FIELD>\r\n                    <FIELD NAME=\'CredFlow_altmasterid\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <XMLTAG>&quot;altMasterId&quot;</XMLTAG>\r\n                        <SET>$altmstid</SET>\r\n                    </FIELD>\r\n                    <COLLECTION NAME=\'CredFlow_CompanyMasters\' ISMODIFY=\'No\' ISFIXED=\'No\' ISINITIALIZE=\'No\' ISOPTION=\'No\' ISINTERNAL=\'No\'>\r\n                        <TYPE>company</TYPE>\r\n                        <BELONGSTO>Yes</BELONGSTO>\r\n                    </COLLECTION>\r\n                </TDLMESSAGE>\r\n            </TDL>\r\n        </DESC>\r\n    </BODY>\r\n</ENVELOPE>").send();

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().unwrap());
            return xmltojson::to_json(&raw_xml).unwrap();
        }

        Err(_) => {
            return json!({
                "status":-1,
                "message":"Tally not reachable",
            })
        }
    }
}

#[tauri::command]
pub fn ping() -> serde_json::Value {
    let resp = reqwest::blocking::Client::new()
        .post("http://localhost:9000")
        .body(
            "<ENVELOPE>
            <HEADER>
                <VERSION>1</VERSION>
                <TALLYREQUEST>Export</TALLYREQUEST>
                <TYPE>Data</TYPE>
                <ID>CredFlow_CheckLicenseReport</ID>
            </HEADER>
            <BODY>
                <DESC>
                    <STATICVARIABLES>
                        <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                    </STATICVARIABLES>
                    <TDL>  <TDLMESSAGE>
                        <REPORT NAME='CredFlow_CheckLicenseReport' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <FORMS>CredFlow_CheckLicenseForm</FORMS>
                        </REPORT>
                        <FORM NAME='CredFlow_CheckLicenseForm' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <TOPPARTS>CredFlow_CheckLicensePart</TOPPARTS>
                        </FORM>
                        <PART NAME='CredFlow_CheckLicensePart' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <TOPLINES>CredFlow_CheckLicenseLine</TOPLINES>
                            <SCROLLED>Vertical</SCROLLED>
                        </PART>
                        <LINE NAME='CredFlow_CheckLicenseLine' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <LEFTFIELDS>CredFlow_educationalMode, CredFlow_serialnumber, CredFlow_admin, CredFlow_AccountId</LEFTFIELDS>
                            <XMLTAG>&quot;LicenseInfo&quot;</XMLTAG>
                        </LINE>
                        <FIELD NAME='CredFlow_educationalMode' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <XMLTAG>&quot;EducationalMode&quot;</XMLTAG>
                            <SET>$$LicenseInfo:IsEducationalMode</SET>
                        </FIELD>
                        <FIELD NAME='CredFlow_admin' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <XMLTAG>&quot;Admin&quot;</XMLTAG>
                            <SET>$$LicenseInfo:IsAdmin</SET>
                        </FIELD>
                        <FIELD NAME='CredFlow_serialnumber' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <XMLTAG>&quot;SerialNumber&quot;</XMLTAG>
                            <SET>$$LicenseInfo:SerialNumber</SET>
                        </FIELD>
                        <FIELD NAME='CredFlow_AccountId' ISMODIFY='No' ISFIXED='No' ISINITIALIZE='No' ISOPTION='No' ISINTERNAL='No'>
                            <XMLTAG>&quot;AccountID&quot;</XMLTAG>
                            <SET>$$LicenseInfo:AccountID</SET>
                        </FIELD>
                    </TDLMESSAGE>
                    </TDL>
                </DESC>
            </BODY>
        </ENVELOPE>",
        )
        .send();

    match resp {
        Ok(resp) => {
            let raw_xml = format!(r#"{}"#, resp.text().unwrap());
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
