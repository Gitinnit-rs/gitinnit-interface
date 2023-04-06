import axios from "axios";
import { BASE_URL } from "../constants";
import { useStore } from "../store";
import { useUserStore } from "../store/user";

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
      "Cache-Control": "no-cache",
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

export async function removeCollaborator(username: string) {
  const {
    user: { access_token, login },
  } = useUserStore(); // No need to storeToRefs because one-time use

  const store = useStore();
  const { project } = store;

  if (!project || !project.remoteURL) return [];

  const url =
    BASE_URL + `/repos/${login}/${project.repo.name}/collaborators/${username}`;

  const { status } = await axios.delete(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + access_token,
    },
    data: {
      owner: login,
      repo: project.repo.name,
      username,
    },
  });

  if (status !== 204) throw new Error("Got invalid status code " + status);

  return true;
}
