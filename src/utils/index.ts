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

/**
 * Random image generator function
 */
export function randomImage() {
  return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}
