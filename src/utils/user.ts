import axios from "axios";
import { useUserStore } from "../store/user";
import { Project } from "../types";
import { slugify } from ".";
import { BASE_URL } from "../constants";

export async function getUserDetails(initial_access_token?: string) {
  const url = BASE_URL + "/user";

  const { user, updateAccessToken } = useUserStore();

  const access_token = initial_access_token || user.access_token;

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

  const { data, status } = await axios.post(
    url,
    {
      name: slugify(project.name),
      description:
        "Gitinnit Project with Genre " +
        project.genre +
        " by " +
        project.author,
      private: true,
    },
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + access_token,
      },
    }
  );

  if (status !== 201) throw new Error("Got invalid status code " + status);

  return {
    ...data,
    url: data.html_url,
  };
}
