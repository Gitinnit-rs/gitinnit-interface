use std::{
    fs,
    io::{BufRead, BufReader, Write},
    net::{TcpListener, TcpStream},
};

// TODO: Timeout later on, check for open ports dynamically
#[tauri::command]
pub async fn start_auth_server() -> String {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    println!("Listening on http://127.0.0.1:7878");

    let mut response = String::new();

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        let result = handle_connection(stream);

        if result.len() > 0 {
            response = result;
            break;
        }
    }

    return response;
}

fn handle_connection(mut stream: TcpStream) -> String {
    let buf_reader = BufReader::new(&mut stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    // println!("HTTP LINES VEC => {:#?}", http_request);

    if http_request[0].len() > 10 {
        return http_request.clone().remove(0);
    }

    // Return response as status 200 and status text OK
    let status_line = "HTTP/1.1 200 OK";

    let contents = fs::read_to_string("response.html").unwrap();
    let length = contents.len();

    // Return HTML + JS that closes the tab in 200ms or something
    let response = format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();

    return String::new();
}
