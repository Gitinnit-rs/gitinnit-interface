use serde::Serialize;
use serde_json;
use std::env;
use std::path::Path;
use std::process::{Command, Stdio};
use regex::Regex;

#[derive(Clone, Serialize)]
struct Commit {
    message: String,
    hash: String,
    author: String,
    date: String,
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
  }

#[derive(Clone, Serialize)]
struct Branch {
    name: String,
    current: bool,
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

pub fn set_path(path: &str) -> bool {
    let root = Path::new(path);
    if env::set_current_dir(&root).is_ok(){
        println!(
            "Successfully changed working directory to {}!",
            root.display()
        );
        return true;
    }else{
        
        return false;
    }
}

#[tauri::command]
pub fn get_user_name() -> String {
    let args = vec!["config", "--global", "user.name"];
    return exec_git_command(args);
}

#[tauri::command]
pub fn get_user_email() -> String {
    let args = vec!["config", "--global", "user.email"];
    return exec_git_command(args);
}

#[tauri::command]
pub fn set_user_name(name: &str) {
    let args = vec!["config", "--global", "user.name", &name];
    exec_git_command(args);
}

#[tauri::command]
pub fn set_user_email(email: &str) {
    let args = vec!["config", "--global", "user.email", &email];
    exec_git_command(args);
}

#[tauri::command]
pub fn init( app: tauri::Window, path: &str ) {
    set_path(path);
    let args = vec!["init"];
    exec_git_command(args);
}

#[tauri::command]
pub fn fetch( path: &str){
    set_path(path);
    let args = vec!["fetch"];
    exec_git_command(args);
    create_local_branch(path);
}

pub fn create_local_branch(path: &str){
    set_path(path);
    let mut args = vec!["branch", "-a"];
    let output = exec_git_command(args);

    let remote_re = Regex::new("^ *remotes/.*").unwrap();
    
    for x in output.split("\n") {
        if x.len() == 0{
            continue;
        }
        if remote_re.is_match(x){
            let (_, name) = x.rsplit_once('/').unwrap();
            let create_branch_args = vec!["branch", name];
            exec_git_command(create_branch_args);
        }
    }
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
    let args = vec!["checkout", &checkout_path];
    let return_val: String = exec_git_command(args);
    return return_val;
}

#[tauri::command]
pub fn status(path: &str) -> String {
    set_path(path);
    let add_result = add(path);
    assert!(add_result == "success", "{}", add_result);
    let args = vec!["status"];
    return exec_git_command(args);
}



#[tauri::command]
pub fn log(hash: &str, path: &str) -> Result<String, String> {
    set_path(path);
    let mut args = vec!["log"];
    if hash.len() != 0 {
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
            } else {
                break;
            }
        }
    }

    return Ok(serde_json::to_string(&logs).unwrap());
}

#[tauri::command]
pub fn get_local_branches(path: &str) -> Result<String, String> {
    set_path(path);
    let mut args = vec!["branch"];
    let output = exec_git_command(args);
    let mut branch = Branch {
        name: String::from(""),
        current: false,
    };

    let mut branches = Vec::<Branch>::new();

    for x in output.split("\n") {
        if x.len() == 0{
            continue;
        }
        branch.name = x.to_string().trim().to_string();
        if x.contains("*"){
            branch.current = true;
            let mut name = branch.name.split(" ");
            branch.name = name.nth(1).unwrap().to_string();
        }else{
            branch.current = false;
        }
        branches.push(branch.clone());
        
        //reset
        branch.name = String::from("");
        branch.current = false;
    }
    return Ok(serde_json::to_string(&branches).unwrap());
}

#[tauri::command]
pub fn get_current_branch(path: &str) -> String {
    // CALL THIS METHOD WHEN DETACHED HEAD
    set_path(path);
    let mut args = vec!["branch", "--contains", "HEAD"];
    let output = exec_git_command(args);
    let mut name = String::from("");
    for x in output.split("\n") {
        if x.len() == 0{
            continue;
        }
        let mut temp = x.split(" ");
        name = temp.nth(1).unwrap().to_string();
    }
    return name
}

#[tauri::command]
pub fn add_remote(path: &str, url: &str){
    set_path(path);
    let args = vec!["remote", "add", "origin", url];
    exec_git_command(args);
}

#[tauri::command]
pub fn pull(path: &str) -> String{
    set_path(path);
    let args = vec!["pull"];
    return exec_git_command(args);
}

#[tauri::command]
pub fn push(path: &str, branch:&str) -> String{
    set_path(path);
    let args = vec!["push", "origin", branch];
    return exec_git_command(args);
}