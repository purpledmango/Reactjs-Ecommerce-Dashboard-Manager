import api from "./api"
import Cookies from "js-cookie"
export const loginAPI = async (creds) => {
    try {
        const response = await api.post("/auth/login", creds)
        return response.data
    } catch (error) {
        console.log("Error with API", error)
    }
}

export const getUserAPI = async (uid) => {
    try {
        const resposne = await api.get(`/auth/get-user/${uid}`)

        return resposne.data
    }
    catch (error) {
        console.log("Error with API", error)
    }
}

export const logoutAPI = async () => {
    try {
        const resposne = await api.post(`/auth/logout`)
        Cookies.remove("connect.sid")
        return resposne.data
    }
    catch (error) {
        console.log("Error with API", error)
    }
}