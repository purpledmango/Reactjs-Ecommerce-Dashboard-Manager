import api from "./api";

export const newOrdersApi = async () => {
    try {
        const response = await api.get("/orders/new-orders");
        return response.data
    } catch (error) {
        console.log("Error while Connecting from API", error);
    }
}