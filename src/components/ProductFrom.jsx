
import { useEffect, useState } from 'react';
import ImageUploader from 'react-image-upload';
import Button from '../components/Button';
import { addProductAPI } from '../services/products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PoductInfo from './ProductInfo';
import getCookieData from '../helpers/getCookieToken';
import { PiPlusCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
import { allCategories } from '../services/inventoryAPIS';
import Spinner from './Spinner';
const ProductForm = ({ showProductForm, setShowProductForm, categoryData, tagData }) => {

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        stock: 0,
        description: '',
        thumbnail: null,
        category: null,
        tag: null,

    });

    const [savedProduct, setSavedProduct] = useState(null)


    useEffect(() => { }, [savedProduct])

    const handleFormDataChange = (field, value) => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value,
        }));
    };

    const handleThumbnailUpload = (thumbnail) => {
        if (thumbnail) {
            setNewProduct((prevProduct) => ({
                ...prevProduct,
                thumbnail: thumbnail.file, // Save the whole File object
            }));
        }
    };



    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            // Append individual form fields
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('stock', newProduct.stock);
            formData.append('description', newProduct.description);
            formData.append('tag', newProduct.tag);
            formData.append('category', newProduct.category);

            // Append thumbnail
            if (newProduct.thumbnail) {
                formData.append('thumbnail', newProduct.thumbnail);
            }


            console.log(formData)
            // Call your API to add the product
            const newProductResponse = await addProductAPI(formData);
            setSavedProduct(newProductResponse.product)
            toast.success(newProductResponse.message);
        } catch (error) {
            toast.error("Error saving Product");
            console.error(error);
        }
    };

    const handleClose = () => {
        setSavedProduct(false)
        setNewProduct({
            name: '',
            price: 0,
            stock: 0,
            description: '',
            thumbnail: null,
            category: null,
            tag: null,

        })
        setShowProductForm(false)
    }

    console.log("product form Category", categoryData)

    return (
        <div className="w-full p-2 md:p-6 lg:p-12 bg-primary-color  rounded-t-2xl rounded-b-lg">
            <button onClick={handleClose}> <PiXCircleDuotone className='text-4xl' /></button>
            <h3 className="text-3xl text-center text-secondary-color pb-6">{!savedProduct ? "Add Product" : "Saved Product"}</h3>

            {savedProduct ? (
                <PoductInfo product={savedProduct} />
            ) :
                (
                    <form onSubmit={saveProduct} className="w-full  flex flex-col gap-12  p-2  md:py-6 md:px-4 lg:py-12 lg:px-8 ">
                        <div className="grid grid-cols-8 gap-2">
                            <label className="text-xl col-span-12 md:col-span-1 text-secondary-color flex justify-end">
                                Name
                            </label>
                            <input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => handleFormDataChange("name", e.target.value)} className="focuse:p w-full p-4 bg-secondary-color/30 rounded-xl  col-span-12 md:col-span-7 focus:outline-none focus:ring focus:border-accent-color" />
                        </div>
                        <div className="grid grid-cols-8 w-full gap-4">
                            <div className="col-span-4 grid grid-cols-8 flex gap-4">
                                <label className="text-xl  col-span-12 md:col-span-2  text-secondary-color flex justify-end">
                                    Price
                                </label>
                                <input name='price' value={newProduct.price} onChange={(e) => handleFormDataChange("price", e.target.value)} type="number" className="w-full p-4 rounded-xl  col-span-12 md:col-span-6  bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" />
                            </div>
                            <div className="col-span-4 grid grid-cols-8 flex gap-4">
                                <label className="text-xl  col-span-12 md:col-span-2  text-secondary-color flex justify-end">
                                    Stock
                                </label>
                                <input name="stock" value={newProduct.stock} onChange={(e) => handleFormDataChange("stock", e.target.value)} type="number" className="w-full p-4 rounded-xl  col-span-12 md:col-span-6 bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" />
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-2">
                            <label className="text-xl  col-span-12 md:col-span-1 text-secondary-color flex justify-end">
                                Description
                            </label>
                            <textarea name="description" value={newProduct.description} onChange={(e) => handleFormDataChange("description", e.target.value)} placeholder='Product Info Here...' type="text" className="w-full p-4 h-24 rounded-xl col-span-12 md:col-span-7 bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" />
                        </div>
                        <div className="grid grid-cols-8 gap-2 relative">
                            <label className="text-xl  col-span-12 md:col-span-1 text-secondary-color flex justify-end">
                                Thumbnail
                            </label>

                            <ImageUploader

                                className="asbsolute h-[200px] w-[200px] bg-transparent " onFileAdded={(thumbnail) => handleThumbnailUpload(thumbnail)}
                            />

                        </div>


                        <div className="grid grid-cols-8 w-full gap-4">
                            <div className="col-span-4 grid grid-cols-8 flex gap-4">
                                <label className="text-xl col-span-12 md:col-span-2 text-secondary-color flex justify-end">
                                    Category
                                </label>
                                {categoryData ? (<select
                                    name="category"
                                    value={newProduct.category}
                                    onChange={(e) => handleFormDataChange("category", e.target.value)}
                                    className="w-full p-4 rounded-xl col-span-12 md:col-span-6 bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color"
                                >
                                    <option value="">Add to a Category</option>
                                    {categoryData.map((item, key) => (
                                        <option key={key} value={item.name}>{item.name}</option>
                                    ))}


                                    {/* Add more options as needed */}
                                </select>) : <Spinner />}
                            </div>
                            <div className="col-span-4 grid grid-cols-8 flex gap-4">
                                <label className="text-xl col-span-12 md:col-span-2 text-secondary-color flex justify-end">
                                    Tag
                                </label>
                                {tagData ? (<select
                                    name="category"
                                    value={newProduct.tag}
                                    onChange={(e) => handleFormDataChange("tag", e.target.value)}
                                    className="w-full p-4 rounded-xl col-span-12 md:col-span-6 bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color"
                                >
                                    <option value="">Put a tag</option>
                                    {tagData.map((item, key) => (
                                        <option key={key} value={item.name}>{item.name}</option>
                                    ))}


                                    {/* Add more options as needed */}
                                </select>) : <Spinner />}
                            </div>
                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <Button type="submit" text="Save" />
                        </div>

                    </form>
                )
            }

        </div >
    )
};

export default ProductForm;
