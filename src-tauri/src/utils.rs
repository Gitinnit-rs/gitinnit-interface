use std::process::Command;
use std::env;
use std::path::Path;

// fn main(){
//   set_path("C:/Users/vedant/Desktop/TestFolder/testRs");
//   log();
// }

fn set_user_name(name: &str){
  let mut cmd = Command::new("git");
  let commit_command: String = "config --global user.name".to_string() + &name.to_string();
  cmd.arg("config ");
    match cmd.output()
      {
        Ok(o) =>{
          unsafe{
            println!("OUTPUT {:?}", String::from_utf8_unchecked(o.stdout));
          }
        }
        Err(e)=>{
        println!("THER WAS AN ERR {}",e);
        }
      }
}

fn set_user_email(email: &str){
  let mut cmd = Command::new("git");
  let commit_command: String = "config --global user.email".to_string() + &email.to_string();
  cmd.arg("config ");
    match cmd.output()
      {
        Ok(o) =>{
          unsafe{
            println!("OUTPUT {:?}", String::from_utf8_unchecked(o.stdout));
          }
        }
        Err(e)=>{
        println!("THER WAS AN ERR {}",e);
        }
      }
}

fn set_path(path: &str){
  let root = Path::new(path);
  assert!(env::set_current_dir(&root).is_ok());
  println!("Successfully changed working directory to {}!", root.display());
}

fn init(){
  let mut cmd = Command::new("git");
  cmd.arg("init");
    match cmd.output()
      {
        Ok(o) =>{
          unsafe{
            println!("OUTPUT {:?}", String::from_utf8_unchecked(o.stdout));
          }
        }
        Err(e)=>{
        println!("THER WAS AN ERR {}",e);
        }
      }
}


fn log(){
  let mut cmd = Command::new("git");
  let output = cmd.arg("log")
  .output()
  .expect("failed to execute process");
  unsafe{
    let commits = String::from_utf8(output.stdout);
    match commits{
      Ok(o) =>{
        unsafe{
          println!("{:?}", o.split("\n\n").collect::<Vec<&str>>());
        }
      }
      Err(e)=>{
      println!("THER WAS AN ERR {}",e);
      }
    }
  }
}

fn add(){
  let mut cmd = Command::new("git");
    
  cmd.arg("add .");
    match cmd.output()
      {
        Ok(o) =>{
          unsafe{
            println!("OUTPUT {:?}", String::from_utf8_unchecked(o.stdout));
          }
        }
        Err(e)=>{
        println!("THERE WAS AN ERR {}",e);
        }
      }
}

fn commit(message: &str){
  add();
  
  println!("MESSAGE: {}", message);
  let mut cmd = Command::new("git");

  let commit_command: String = "commit -m ".to_string() + &message.to_string();

  cmd.arg(commit_command);
    match cmd.output()
      {
        Ok(o) =>{
          unsafe{
            println!("OUTPUT {:?}", String::from_utf8_unchecked(o.stdout));
          }
        }
        Err(e)=>{
        println!("THERE WAS AN ERR {}",e);
        }
      }
}



fn status(){
  let mut cmd = Command::new("git");
    
  cmd.arg("status");
    match cmd.output()
      {
        Ok(o) =>{
          unsafe{
            println!("OUTPUT {:?}", String::from_utf8_unchecked(o.stdout));
          }
        }
        Err(e)=>{
        println!("THERE WAS AN ERR {}",e);
        }
      }
}