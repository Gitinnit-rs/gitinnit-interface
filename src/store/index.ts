import { http, invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/shell";
import { defineStore } from "pinia";
import { AUTH_URL } from "../constants";
import { Commit, Project } from "../types";
import { fetchConfigData, globalConfigPath } from "../utils";

export const useStore = defineStore("gitinnit-store", {
  state: () => ({
    compact: true,
    projects: [] as Project[],
    project: undefined as Project | undefined,
    timeline: [] as Commit[],
    scrollLock: false,
    user: undefined as any,
    accessToken: undefined as String | undefined,
  }),
  actions: {
    toggleCompact() {
      this.compact = !this.compact;
    },
    async getTimeline() {
      if (!this.project) return;

      // Fetch git logs
      this.timeline = JSON.parse(
        await invoke("log", {
          path: this.project.path,
        })
      );
    },
    async login() {
      open(AUTH_URL + `/login?returnUrl=http://127.0.0.1:7878`);

      // Start internal auth server
      let http_response: string = await invoke("start_auth_server");
      http_response = http_response.slice(5, -9);

      // const urlParams = new URLSearchParams(http_response);
      // console.log("GET PARAM", urlParams.getAll("access_token"));
      // console.log("BARE", urlParams.toString());

      const access_token = new URLSearchParams(http_response).get(
        "accessToken"
      );
      console.log({ access_token });
      // Fetch user object
      // utils->updateGlobalConfig with the user object
    },
  },
});
