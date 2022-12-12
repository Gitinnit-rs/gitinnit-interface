use serde::Serialize;
use serde_json;
use std::env;
use std::path::Path;
use std::process::{Command, Stdio};

#[derive(Clone, Serialize)]
struct Commit {
    message: String,
    hash: String,
    author: String,
    date: String,
}

fn exec_git_command(args: Vec<&str>) -> String {
    let output = Command::new("git")
        .args(args)
        .stdout(Stdio::piped())
        .output()
        .unwrap();

    let stdout = String::from_utf8(output.stdout).unwrap();
    return stdout;
}

#[tauri::command]
fn set_user_name(name: &str) {
    let args = vec!["config", "--global", "user.name", &name];
    exec_git_command(args);
}

#[tauri::command]
fn set_user_email(email: &str) {
    let args = vec!["config", "--global", "user.email", &email];
    exec_git_command(args);
}

#[tauri::command]
pub fn init(path: &str) {
    set_path(path);
    let args = vec!["init"];
    exec_git_command(args);
}

#[tauri::command]
pub fn log(hash:&str, path: &str) -> Result<String, String> {
    set_path(path);
    println!("print {}", hash);
    let mut args = vec!["log"];
    if hash.len() != 0{
        args.push(hash);
    }
    let output = exec_git_command(args);

    let mut logs = Vec::<Commit>::new();
    let mut is_message = false;
    let mut commit = Commit {
        message: String::from(""),
        hash: String::from(""),
        author: String::from(""),
        date: String::from(""),
    };

    for x in output.split("\n\n") {
        if is_message {
            commit.message = x.to_string();
            logs.push(commit.clone());
            is_message = false;
        } else {
            let lines = x.split("\n").collect::<Vec<&str>>();
            if lines.len() == 3 {

                let start_bytes = lines[0].find(" ").unwrap_or(0);
                commit.hash = lines[0][start_bytes..].to_string();
                
                let start_bytes = lines[1].find(" ").unwrap_or(0);
                commit.author = lines[1][start_bytes..].to_string();
                
                let start_bytes = lines[2].find(" ").unwrap_or(0);
                commit.date = lines[2][start_bytes..].to_string();
                is_message = true;
            }else{
                break
            }
        }
    }

    return Ok(serde_json::to_string(&logs).unwrap());
}

#[tauri::command]
pub fn add(path: &str) -> String {
    set_path(path);
    let args = vec!["add", "."];
    let mut return_val: String = exec_git_command(args);
    if return_val == "" {
        return_val = "success".to_string();
    }
    return return_val;
}

#[tauri::command]
pub fn commit(message: &str, path: &str) {
    set_path(path);
    let add_result = add(path);
    assert!(add_result == "success", "{}", add_result);
    let args = vec!["commit", "-m", &message];
    let return_val: String = exec_git_command(args);
}

#[tauri::command]
pub fn checkout(checkout_path: &str, path: &str) -> String {
    set_path(path);
    let args = vec!["checkout",  &checkout_path];
    let return_val: String = exec_git_command(args);
    return return_val
}

pub fn status(path: &str) {
    set_path(path);
    let add_result = add(path);
    assert!(add_result == "success", "{}", add_result);
    let args = vec!["status"];
    let return_val: String = exec_git_command(args);
}

pub fn set_path(path: &str) {
    let root = Path::new(path);
    assert!(env::set_current_dir(&root).is_ok());
    println!(
        "Successfully changed working directory to {}!",
        root.display()
    );
}
