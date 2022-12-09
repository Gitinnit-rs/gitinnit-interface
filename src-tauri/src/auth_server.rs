use std::{
    io::{BufRead, BufReader, Write},
    net::{TcpListener, TcpStream},
};

pub fn main() {
    create_auth_server();
}

pub fn create_auth_server() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    println!("Listening on http://127.0.0.1:7878");

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    // Return response as status 200 and status text OK
    let response = "HTTP/1.1 200 OK\r\n\r\n";
    stream.write_all(response.as_bytes()).unwrap();

    // Can later return HTML + JS that closes the tab in 200ms or something
}
