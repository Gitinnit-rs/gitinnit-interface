#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod auth_server;
mod file_handler;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            utils::log,
            utils::init,
            utils::commit,
            utils::checkout,
            file_handler::read_file,
            file_handler::write_file,
            file_handler::create_dir_if_not_exists,
            auth_server::start_auth_server
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
