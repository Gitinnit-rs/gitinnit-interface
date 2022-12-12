import { invoke } from "@tauri-apps/api";
import { appDataDir } from "@tauri-apps/api/path";
import { useStore } from "../store";

export const globalAppPath = async () => await appDataDir();
export const globalConfigPath = async () =>
  (await globalAppPath()) + "globalConfig.json";

export async function fetchConfigData() {
  const store = useStore();

  const data: string = await invoke("read_file", {
    path: await globalConfigPath(),
  });
  store.$patch({
    projects: JSON.parse(data).projects,
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

/**
 * Random image generator function
 */
export function randomImage() {
  return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}
