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


// #[cfg(test)]

// mod tests {
//     use super::*;
//     #[test]
//     // fn git_add(){
//     //     assert_eq!("success",utils::add(r"C:\Users\Parth\Documents\Believer"));
//     //     assert_eq!("success",utils::add());
//     //     assert_eq!("success",utils::add(r"1"));
//     //     assert_eq!("success",utils::add(r"#$"))
//     // }

//     // fn git_commit(){
//     //     assert_eq!("",utils::commit(r"New song believer",r"C:\Users\Parth\Documents\Believer"));
//     //     assert_eq!("",utils::commit(r"",r"C:\Users\Parth\Documents\Believer"));
//     //     assert_eq!("",utils::commit(r"New song believer",r""));
//     //     assert_eq!("",utils::commit(r"New song believer",r"124"));
//     //     assert_eq!("",utils::commit(r"New song believer",r"#@"));
//     // }

//     // fn git_status(){
//     //     assert_eq!("",utils::status(r"C:\Users\Parth\Documents\Believer"));
//     //     assert_eq!("",utils::status(r""));
//     //     assert_eq!("",utils::status(r"123"));
//     //     assert_eq!("",utils::status(r"#@"));
//     //     assert_eq!("",utils::status(r"C:\Devs4\Documents"));
//     // }

//     // fn git_checkout(){    
//     //     assert_eq!("",utils::checkout(r"C:\Users\Parth\Documents\Believer",r"C:\Users\Parth\Documents"));
//     //     assert_eq!("",utils::checkout(r"",r"C:\Users\Parth\Documents"));
//     //     assert_eq!("",utils::checkout(r"C:\Users\Parth\Documents\Believer",r""));
//     //     assert_eq!("",utils::checkout(r"123",r"C:\Users\Parth\Documents"));
//     //     assert_eq!("",utils::checkout(r"C:\Users\Parth\Documents\Believer",r"123"));
//     // }

//     // fn get_set_path(){
//     //     assert_eq!("Successfully changed working directory!",utils::set_path(r"C:\Users\Parth\Documents"));
//     //     assert_eq!("Successfully changed working directory!",utils::set_path(r""));
//     //     assert_eq!("Successfully changed working directory!",utils::set_path(r"C:\Users\dev\Documents"));
//     // }

//     // fn create_branch(){
//     //     assert_eq!("",utils::create_local_branch("r'https://github.com/devs4shah/ferries.git/mtest"));
//     // }

//     // fn git_pull(){
//     //     assert_eq!("Already up to date",utils::pull("https://github.com/devs4shah/ferries/"))
//     // }

//     // fn git_push(){
//     //     assert_eq!("",utils::push("https://github.com/devs4shah/ferries/","master"))
//     // }

// }