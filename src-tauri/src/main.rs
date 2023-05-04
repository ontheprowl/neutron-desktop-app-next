#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod tally;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            tally::get_tally_companies,
            tally::ping
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

