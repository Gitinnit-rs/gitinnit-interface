use std::net::TcpListener;

pub fn main(){
    create_auth_server();
}

pub fn create_auth_server() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    
    for stream in listener.incoming() {
        let stream = stream.unwrap();

        println!("Connection established!", );
    }
}
