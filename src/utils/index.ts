import { invoke } from "@tauri-apps/api";
import { appDataDir } from "@tauri-apps/api/path";
import { useStore } from "../store";
import { useUserStore } from "../store/user";

export const globalAppPath = async () => await appDataDir();
export const globalConfigPath = async () =>
  (await globalAppPath()) + "globalConfig.json";

export async function fetchConfigData() {
  const store = useStore();
  const userStore = useUserStore();

  const data: string = await invoke("read_file", {
    path: await globalConfigPath(),
  });

  // TODO: Verify login information. If access_token expired (user details call doesn't work), don't set user. Have to re-login. Also to update information
  store.$patch({
    projects: JSON.parse(data).projects,
  });
  userStore.$patch({
    user: JSON.parse(data).user || undefined,
  });
}

export async function updateGlobalConfig(property: string, value: any) {
  const _globalConfig = await globalConfigPath();

  const globalConfigJSON: string = await invoke("read_file", {
    path: _globalConfig,
  });

  const globalData = JSON.parse(globalConfigJSON);

  globalData[property] = value;

  invoke("write_file", {
    path: _globalConfig,
    contents: JSON.stringify(globalData),
  }).then(() => {
    setTimeout(fetchConfigData, 1000);
  });
}

// export function parseJwt(token: string) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }

/**
 * Random image generator function
 */
export function randomImage() {
  return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
