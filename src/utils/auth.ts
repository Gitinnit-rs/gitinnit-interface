import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/shell";
import { AUTH_URL, LOCAL_AUTH_URL } from "../constants";
import client from "./supabase";

// export async function login() {
//   open(AUTH_URL + `/login?returnUrl=${LOCAL_AUTH_URL}`);

//   // Start internal auth server
//   let http_response: string = await invoke("start_auth_server");
//   http_response = http_response.slice(5, -9);

//   // const urlParams = new URLSearchParams(http_response);
//   // console.log("GET PARAM", urlParams.getAll("access_token"));
//   // console.log("BARE", urlParams.toString());

//   const access_token = new URLSearchParams(http_response).get("accessToken");
//   // Fetch user object
//   // utils->updateGlobalConfig with the user object
// }

export async function loginWithSupabase() {
  await client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: window.location.origin + "/auth_callback",
      scopes: "user repo"
    }
  })
}
