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
pub fn create_dir_if_not_exists(folderpath: &str) {
    let path = Path::new(folderpath);
    if !path.exists() {
        fs::create_dir(path);
    }
}
