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
            utils::push,
            utils::pull,
            utils::init,
            utils::fetch,
            utils::status,
            utils::commit,
            utils::checkout,
            utils::add_remote,
            utils::get_user_name,
            utils::set_user_name,
            utils::set_user_email,
            utils::get_user_email,
            utils::get_local_branches,
            utils::get_current_branch,
            file_handler::read_file,
            file_handler::write_file,
            file_handler::copyFile,
            file_handler::create_dir_if_not_exists,
            auth_server::start_auth_server
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
