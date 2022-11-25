import { invoke } from '@tauri-apps/api'
import { appDataDir } from '@tauri-apps/api/path'
import { useStore } from '../store'

export const globalAppPath = async () => await appDataDir()
export const globalConfigPath = async () => await globalAppPath() + "globalConfig.json"

export async function fetchProjects() {
    const store = useStore()

    const data: string = await invoke('read_file', {
        path: await globalConfigPath()
    })
    console.log("Read file", data)
    store.$patch({
        projects: JSON.parse(data).projects
    })
}

/**
 * Random image generator function
 */
export function randomImage() {
    return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}
