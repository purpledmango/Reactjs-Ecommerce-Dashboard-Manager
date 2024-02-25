import api from "./api"

export const recentlyAddedProductsAPI = async () => {
    try {
        const recentlyAddedData = await api.get("/inventory/recently-added")
        return recentlyAddedData.data

    } catch (error) {
        console.error("Error with API", error)
    }
}

export const allCategories = async () => {
    try {
        const categoryResponse = await api.get("/category/all");
        return categoryResponse.data
    } catch (error) {
        console.error("Error with API", error)
    }
}

export const addCategory = async (data) => {
    try {
        const response = await api.post("/category/add", data);
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}

export const deleteCategory = async (cid) => {
    try {
        const response = await api.delete(`/category/delete/${cid}`);
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}

export const updateCategory = async (cid, data) => {
    try {
        const response = await api.put(`/category/update/${cid}`, data);
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}



export const allTags = async () => {
    try {
        const response = await api.get("/tag/all");
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}

export const addTag = async (data) => {
    try {
        const response = await api.post("/tag/add", data);
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}


export const deleteTag = async (tid) => {
    try {
        const response = await api.delete(`/tag/delete/${tid}`);
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}

export const updateTag = async (tid, data) => {
    try {
        const response = await api.put(`/tag/update/${tid}`, data);
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}


export const allProductsKPI = async () => {
    try {
        const response = await api.get('/kpi/products');
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}
export const activeProductsKPI = async () => {
    try {
        const response = await api.get('/kpi/active-products');
        return response.data
    } catch (error) {
        console.error("Error with API", error)
    }
}

export const addImageToProduct = async (pid, image) => {
    console.log("parsed images", image)
    try {
        const formData = new FormData();
        formData.append('imgFile', image);

        const response = await api.patch(`/product/update-image/${pid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error with API", error);
        throw error; // Re-throw the error to handle it outside
    }
}
