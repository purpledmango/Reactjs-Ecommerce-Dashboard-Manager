import api from "./api";

export const getTagsApi = async () => {
    try {
        const response = await api.get("/category/all")
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}
export const addTagsApi = async (newCatData) => {
    try {
        const response = await api.post(`/category/add`, newCatData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    } catch (error) {
        console.log("Error with API")
    }
}