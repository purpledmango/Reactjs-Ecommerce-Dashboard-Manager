import api from "./api";

export const allUserKPI = async () => {
    try {
        const response = await api.get("/kpi/users")
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}
export const usersThisWeek = async () => {
    try {
        const response = await api.get("/kpi/users-this-week")
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}
export const usersThisMonth = async () => {
    try {
        const response = await api.get("/kpi/users-this-month")
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}
export const staffUsers = async () => {
    try {
        const response = await api.get("/users/staff")
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}

export const addUserApi = async (userData) => {
    try {
        const response = await api.post("/auth/add-user", userData)
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}

export const updateUserApi = async (uid, userData) => {
    try {
        const response = await api.put(`/auth/update-user/${uid}`, userData)
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}


