use std::fs;
use std::io::Write;
use std::path::Path;

#[tauri::command]
pub fn read_file(path: &str) -> String {
    return fs::read_to_string(path).expect("Unable to read file");
}

#[tauri::command]
pub fn write_file(path: &str, contents: &str) {
    let mut file = fs::OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(path)
        .expect("Unable to write to file");
    write!(file, "{}", contents);
}

#[tauri::command]
pub fn create_dir_if_not_exists(folderpath: &str) -> bool {
    let path = Path::new(folderpath);

    if !path.exists() {
        fs::create_dir(path);
        return true; // Created a new dir
    }

    return false; // Didn't need to create dir as it already exists
}

#[tauri::command]
pub fn copyFile(from: &str, to: &str) -> bool {
    let from_path = Path::new(from);
    let to_path = Path::new(to);

    if !from_path.exists() {
        return false;
    }

    let result = fs::copy(from_path, to_path);

    if result.is_err() {
        return false;
    }

    return true;
}
