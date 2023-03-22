
import axios from 'axios'

export async function getUserDetails(access_token: string) {
    const url = "https://api.github.com/user"

    const { data, status } = await axios.get(url, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: "token " + access_token,
            "X-GitHub-Api-Version": "2022-11-28"
        }
    })

    if (status !== 200) throw new Error("Got invalid status code " + status)

    return data
}
