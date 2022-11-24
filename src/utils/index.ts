import { appDataDir } from '@tauri-apps/api/path'

export const globalAppPath = async () => await appDataDir()
export const globalConfigPath = async () => await globalAppPath() + "globalConfig.json"
