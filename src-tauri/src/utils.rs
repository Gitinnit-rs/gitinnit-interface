use std::env;
use std::path::Path;
use std::process::Command;

fn main(){
  let path = "C:/Users/vedant/Desktop/TestFolder/testRs";
  set_path("C:/Users/vedant/Desktop/TestFolder/testRs");
  status(path);
  commit("TEST", "C:/Users/vedant/Desktop/TestFolder/testRs");
  status(path);
  log(path);
}

fn exec_git_command(args:Vec<String>) -> String{
  match Command::new("git")
        .args(args)
        .spawn()
        .unwrap()
        .wait_with_output(){
          Ok(o) => {
            return "success".to_string()
          }Err(e) => {
            println!("ERR: {}", e);
            return e.to_string()
          } 
        }
}

fn set_user_name(name: &str) {
  let args:Vec<String> = ["config", "--global", "user.name", &name.to_string()].map(String::from).iter().cloned().collect::<Vec<String>>();
  exec_git_command(args);
}


fn set_user_email(email: &str) {
  let args = ["config", "--global", "user.email", &email.to_string()].map(String::from).iter().cloned().collect::<Vec<String>>();
  exec_git_command(args);
}



// #[tauri::command]
pub fn init(path:&str) {
  set_path(path);
  let args = ["init"].map(String::from).iter().cloned().collect::<Vec<String>>();
  exec_git_command(args);
}

fn log(path:&str) {
  set_path(path);
  let args = ["log"].map(String::from).iter().cloned().collect::<Vec<String>>();
  exec_git_command(args);
}

// #[tauri::command]
pub fn add(path: &str) -> String {
  set_path(path);
  let args = ["add", "."].map(String::from).iter().cloned().collect::<Vec<String>>();
  let returnVal:String = exec_git_command(args);
  return returnVal
}


// #[tauri::command]
pub  fn commit(message: &str, path: &str) {
  set_path(path);
  let add_result = add(path);
  assert!(add_result == "success", "{}", add_result);
  let args = ["commit", "-m", &message.to_string()].map(String::from).iter().cloned().collect::<Vec<String>>();
  let returnVal:String = exec_git_command(args);
}

pub fn status(path: &str) {
  set_path(path);
  let add_result = add(path);
  assert!(add_result == "success", "{}", add_result);
  let args = ["status"].map(String::from).iter().cloned().collect::<Vec<String>>();
  let returnVal:String = exec_git_command(args);
}

// #[tauri::command]
pub fn set_path(path: &str) {
  let root = Path::new(path);
  assert!(env::set_current_dir(&root).is_ok());
  println!(
      "Successfully changed working directory to {}!",
      root.display()
  );
}