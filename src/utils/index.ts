import { appDataDir } from '@tauri-apps/api/path'

export const globalAppPath = async () => await appDataDir() + ""
