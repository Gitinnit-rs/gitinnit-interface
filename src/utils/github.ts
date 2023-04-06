import axios from "axios";
import { useUserStore } from "../store/user";
import { Project } from "../types";
import { slugify } from ".";
import { useStore } from "../store";

const BASE_URL = "https://api.github.com";

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

/* Collaborators */
export async function getCollaborators() {
  const store = useStore();
  const { project } = store;
  const { user } = useUserStore();

  store.$patch({
    collaborators: [],
  });

  if (!project || !project.remoteURL) return [];

  const url =
    BASE_URL + `/repos/${user.login}/${project.repo.name}/collaborators`;

  const { data, status } = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + user.access_token,
    },
  });

  if (status !== 200) throw new Error("Got invalid status code " + status);

  store.$patch({
    collaborators: data.slice(1),
  });

  return data.slice(1);
}

export async function addCollaborator(username: string) {
  const {
    user: { access_token, login },
  } = useUserStore(); // No need to storeToRefs because one-time use

  const store = useStore();
  const { project } = store;

  if (!project || !project.remoteURL) return [];

  const url =
    BASE_URL + `/repos/${login}/${project.repo.name}/collaborators/${username}`;

  const { status } = await axios.put(
    url,
    {},
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + access_token,
      },
    }
  );

  if (status === 204) return false; // Already a collaborator

  if (status !== 201) throw new Error("Got invalid status code " + status);

  return true; // 201, Invitation created
}
