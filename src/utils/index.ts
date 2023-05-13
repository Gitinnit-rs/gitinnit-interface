import { invoke } from "@tauri-apps/api";
import { appDataDir } from "@tauri-apps/api/path";
import { useStore } from "../store";
import { useUserStore } from "../store/user";
import { Project } from "../types";
import { LOCAL_PROJECT_FILENAME } from "../constants";

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
        project: JSON.parse(data).projects.find(
            (item: Project) => item.id === store.project?.id
        ), // Update the current project as well
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
        contents: JSON.stringify(globalData, null, 4),
    }).then(() => {
        setTimeout(fetchConfigData, 1000);
    });
}

/**
 * Update project config in both globalConfig and local project config file
 */
export async function updateProjectConfig(
    projectId: number,
    property: string,
    value: any,
    updateLocalConfig = true
) {
    const _globalConfig = await globalConfigPath();

    const globalConfigJSON: string = await invoke("read_file", {
        path: _globalConfig,
    });

    const globalData = JSON.parse(globalConfigJSON);

    let index = null;
    const project = (globalData.projects as Project[]).find((item, i) => {
        if (item.id === projectId) {
            index = i;
            return true;
        } else return false;
    }) as any;

    project[property] = value;

    if (index === null) throw new Error("Unable to locate project");

    globalData.projects[index] = project;

    console.log({ globalData });

    // Update global config
    invoke("write_file", {
        path: _globalConfig,
        contents: JSON.stringify(globalData, null, 4),
    }).then(() => {
        setTimeout(fetchConfigData, 1000);
    });

    if (updateLocalConfig) {
        // Update local config
        invoke("write_file", {
            path: (project as Project).path + "/" + LOCAL_PROJECT_FILENAME,
            contents: JSON.stringify(project, null, 4),
        });
    }
}

/**
 * Random image generator function
 */
export function randomImage() {
    return `https://picsum.photos/id/${Math.floor(
        Math.random() * 100
    )}/400/400`;
}

export const slugify = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const secondsToString = (seconds: number) =>
    new Date(seconds * 1000).toISOString().slice(14, 19);
