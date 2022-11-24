#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![utils::init, utils::commit])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
