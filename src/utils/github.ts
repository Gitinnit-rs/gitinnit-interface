import axios from "axios";
import { useUserStore } from "../store/user";
import { Project } from "../types";

const BASE_URL = "https://api.github.com";

export async function getUserDetails(initial_access_token?: string) {
  const url = BASE_URL + "/user";

  const { user, updateAccessToken } = useUserStore();

  const access_token = initial_access_token || user.access_token

  const { data, status } = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + access_token,
    },
  });

  if (status === 401) {
    // Need to login again, show login banner below
    updateAccessToken("");
    return;
  }

  if (status !== 200) throw new Error("Got invalid status code " + status);

  return data;
}

export async function createRepository(project: Project) {
  const url = BASE_URL + "/user/repos";

  const {
    user: { access_token },
  } = useUserStore(); // No need to storeToRefs because one-time use

  console.log("Access Token in create repository", access_token);
  console.log("HIHAIFUAIHFIUH");

  const { data, status } = await axios.post(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + access_token,
    },
    data: {
      name: project.name,
      description: "Gitinnit Project with Genre " + project.genre,
      private: true,
    },
  });

  if (status !== 201) throw new Error("Got invalid status code " + status);

  return data.html_url;
}
