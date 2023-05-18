#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod models;
mod tally;
mod utils;
use std::{path::PathBuf, sync::Mutex, collections::HashMap};

mod firebase;

use models::Params;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_autostart::init(tauri_plugin_autostart::MacosLauncher::LaunchAgent,None)) /* arbitrary number of args to pass to your app */
        .setup(|app| {
            println!("[FIRESTORE INIT] Retrieving service account credentials");
            let resource_path: PathBuf = app
                .path_resolver()
                .resolve_resource("resources/serviceAccountKey.json")
                .expect("failed to resolve resource");
            println!("[FIRESTORE INIT] Credentials path retrieved");
            if resource_path.exists() {
                app.manage(models::Credentials {
                    path: Mutex::new(resource_path.clone()),
                });

                println!("[FIRESTORE INIT] Credentials path valid.");
                return Ok(());
            } else {
                return Err(
                    "[FIRESTORE INIT] Failed to initialize Firestore.. Credentials path invalid."
                        .into(),
                );
            }
        }).manage(Params(Mutex::new(HashMap::new())))
        .invoke_handler(tauri::generate_handler![
            tally::get_tally_companies,
            tally::ping,
            tally::main_tally_sync
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
