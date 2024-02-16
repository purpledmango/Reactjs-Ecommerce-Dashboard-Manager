import api from "./api"

export const addProductAPI = async (productData) => {
    try {
        const response = await api.post("/product/add-product", productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error with API", error);
        // Rethrow the error to propagate it further if needed
        throw error
    }
};


export const updateProductApi = async (pid, updatedData) => {
    try {
        const editedProduct = await api.put(`/product/update-product/${pid}`, updatedData)
    } catch (error) {
        console.error("Error with API", error);
        // Rethrow the error to propagate it further if needed
        throw error
    }
}