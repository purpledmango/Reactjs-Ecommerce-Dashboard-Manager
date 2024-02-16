import React, { useState } from 'react';
import Button from "./Button";

import { updateProductApi } from '../services/products';
import { toast } from 'react-toastify';

const ProductInfo = ({ product }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSaveChanges = async () => {
        // Here you would typically send the edited product data to your backend for updating

        try {
            const updatedPidResponse = await updateProductApi(product.pid, editedProduct)
            toast.success("Updated Product")
            setIsEditing(false);
        } catch (error) {
            toast.warn("Not UPdated Product")
        }
    }

    return (
        <form className='w-full h-auto text-white' onSubmit={(e) => { e.preventDefault() }}>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='w-full h-full text-lg flex flex-col gap-2 font-extralight'>
                    <h3 className='flex items-center '>
                        <span className='font-bold pr-2'>Product Name </span>
                        {isEditing ? (
                            <input
                                className="focuse:p w-full p-4 bg-secondary-color/30 rounded-xl  col-span-12 md:col-span-7 focus:outline-none focus:ring focus:border-accent-color"
                                type="text"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            editedProduct.name
                        )}
                    </h3>
                    <h4 className='pr-2'><span className='font-bold'> Description</span>
                        {isEditing ? (
                            <textarea
                                className="focuse:p w-full p-4 bg-secondary-color/30 rounded-xl  col-span-12 md:col-span-7 focus:outline-none focus:ring focus:border-accent-color"
                                name="description"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                            />
                        ) : (
                            editedProduct.description
                        )}
                    </h4>
                    <h4 className='pr-2'><span className='font-bold'>Price</span> ₹ {isEditing ? (
                        <input
                            className="focuse:p w-full p-4 bg-secondary-color/30 rounded-xl  col-span-12 md:col-span-7 focus:outline-none focus:ring focus:border-accent-color"
                            type="number"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleInputChange}
                        />
                    ) : (
                        editedProduct.price
                    )}</h4>
                    <h4 className='pr-2'><span className='font-bold'> Currently In Stock</span> {isEditing ? (
                        <input
                            type="number"
                            name="stock"
                            value={editedProduct.stock}
                            onChange={handleInputChange}
                            className="focuse:p w-full p-4 bg-secondary-color/30 rounded-xl  col-span-12 md:col-span-7 focus:outline-none focus:ring focus:border-accent-color"
                        />
                    ) : (
                        editedProduct.stock
                    )}</h4>
                    <h6 className='pr-2'><span className='font-bold'>Product ID</span> {product.pid}</h6>
                    <h6 className='pr-2 flex items-center gap-2'><span className='font-bold'>Status</span> {product.status ? "Active" : "Not Active"} <div className={`w-4 h-4  rounded-full ${product.status ? "bg-green-600" : "bg-red-600"}`}></div></h6>
                    <h6 className='pr-2'><span className='font-bold'>Product ID</span> {product.pid}</h6>
                    <h6 className='pr-2'><span className='font-bold'>Category </span> {product.category}</h6>
                </div>
                <div>
                    <img alt='thumbnail' src={"http://localhost:3000/" + product.thumbnail.path}></img>
                </div>
            </div>
            {isEditing ? (
                <div>
                    <button className="px-5 py-2 rounded-xl hover:scale-105 transition ease-in bg-accent-color text-background-color" onClick={handleSaveChanges}>Save Changes</button>
                    <button className="px-5 py-2 rounded-xl hover:scale-105 transition ease-in bg-accent-color text-background-color" onClick={toggleEditing}>Cancel</button>
                </div>
            ) : (
                <button className="px-5 py-2 rounded-xl hover:scale-105 transition ease-in bg-accent-color text-background-color" onClick={toggleEditing}>Edit</button>
            )}
        </form>
    )
}

export default ProductInfo;
