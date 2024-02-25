import React, { useEffect, useState } from 'react';
import ImageUploader from 'react-image-upload';
import Button from '../components/Button';
import { addProductAPI, deleteProductApi, updateProductApi } from '../services/products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PoductInfo from './ProductInfo';
import getCookieData from '../helpers/getCookieToken';
import { PiCameraDuotone, PiPlusCircleDuotone, PiTrashDuotone, PiXCircleDuotone } from 'react-icons/pi';
import { addImageToProduct, allCategories, allTags } from '../services/inventoryAPIS';
import Spinner from './Spinner';

const ProductForm = ({ showProductForm, setShowProductForm, existingData }) => {
    const [newProduct, setNewProduct] = useState(existingData ? { ...existingData } : {
        name: '',
        price: 0,
        stock: 0,
        description: '',
        category: "null",
        tag: "null",
        active: false,
        productImgs: []
    });
    const [uploadedImg, setUploadedImg] = useState(null)
    const [savedProduct, setSavedProduct] = useState(null);
    const [tagsList, setTagList] = useState([])
    const [catsList, setCatList] = useState([])
    const [displayImgSave, setDisplayImgSave] = useState(false)

    const fetchEditorData = async () => {
        try {
            const [tagRes, catRes] = await Promise.all([allTags(), allCategories()]);
            if (tagRes) {
                setTagList(tagRes.data)
            } else {
                toast.error("Error while Fetching Tags Data")
            }
            if (catRes) {
                setCatList(catRes.data)
            } else {
                toast.error("Error while Fetching Categories Data")
            }
        } catch (error) {
            console.log("Error while Fetching Editor Side Data", error.message)
        }
    }

    useEffect(() => {
        fetchEditorData()
    }, [])

    const handleFormDataChange = (field, value) => {
        setNewProduct(prevProduct => ({ ...prevProduct, [field]: value }));
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            const toastId = toast.info('Saving product...', { autoClose: false });
            const addedProduct = await addProductAPI(newProduct);
            setNewProduct(addedProduct.data);
            setSavedProduct(addedProduct.data)
            toast.success("New Product Added Successfully");
        } catch (error) {
            toast.error(`Error saving Product: ${error.message}`);
            console.error(error);
        } finally {
            setTimeout(() => { toast.dismiss(); }, 3000);
        }
    };

    const updateProd = async (e) => {
        e.preventDefault();
        try {
            const toastId = toast.info('Updating product...', { autoClose: false });
            const res = await updateProductApi(existingData.pid, newProduct);
            setSavedProduct(res.data);
            setNewProduct(res.data);
            toast.success("Product Updated Successfully");
        } catch (error) {
            toast.error(`Error updating Product: ${error.message}`);
            console.error(error);
        } finally {
            setTimeout(() => { toast.dismiss(); }, 3000);
        }
    };

    const onFileAdded = (img) => {
        setDisplayImgSave(true)
        setUploadedImg(img.file)
    };

    const onFileRemoved = () => {
        setDisplayImgSave(false)
        setUploadedImg(null)
    };

    const handleClose = () => {
        setSavedProduct(null);
        setShowProductForm(!showProductForm);
        setNewProduct({
            name: '',
            price: 0,
            stock: 0,
            description: '',
            category: "null",
            tag: "null",
            active: false,
            productImgs: []
        })

        setSavedProduct({
            name: '',
            price: 0,
            stock: 0,
            description: '',
            category: "null",
            tag: "null",
            active: false,
            productImgs: []
        })
    };

    const toggleProductStatus = () => {
        setNewProduct((previtems) => ({ ...previtems, active: !newProduct.active }))
    };

    const handleImageSave = async (e) => {
        e.preventDefault()
        try {
            if (displayImgSave) {
                const processingToastId = toast.info('Processing image addition...', { autoClose: false });
                const savedImage = await addImageToProduct(savedProduct.pid, uploadedImg);
                const updatedProduct = { ...newProduct, productImgs: savedImage.data.productImgs };
                setNewProduct(updatedProduct);
                setSavedProduct(updatedProduct)
                onFileRemoved();
                toast.dismiss(processingToastId);
                if (savedImage) {
                    setDisplayImgSave(false);
                    toast.success('Image added successfully');
                } else {
                    toast.error('Failed to add image, Choose a different Image');
                }
            } else {
                toast.error('Please Select A different Image');
            }
        } catch (error) {
            console.error('Error while adding image:', error);
            toast.error('Error while adding image', error.message);
        }
    };

    const deleteProductHandler = async (e) => {
        e.preventDefault();
        try {
            const processingToastId = toast.info('Deleting product...', { autoClose: false });
            const res = await deleteProductApi(newProduct.pid);
            toast.dismiss(processingToastId);
            if (res) {
                toast.success('Product deleted successfully');
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Error deleting product');
        }
    };

    return (
        <div className="w-full p-2 md:p-4 bg-primary-color/30 rounded-t-2xl rounded-b-lg">
            <div className='flex justify-between'>
                <button onClick={() => setShowProductForm(!showProductForm)}>
                    <PiXCircleDuotone className="text-4xl" />
                </button>
                {existingData && <button onClick={deleteProductHandler}>
                    <PiTrashDuotone className="text-4xl text-rose-600" />
                </button>}
            </div>
            <h3 className="text-3xl text-center text-secondary-color ">{!newProduct ? 'Add Product' : 'Saved Product'}</h3>

            <div className="w-full grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 p-2 md:py-6 md:px-4 lg:py-12 lg:px-8 ">
                <div className='col-span-2 md:col-span-1 bg-primary-color rounded-lg rounded-b-lg px-2 py-4 flex flex-col gap-4  justify-start'>

                    <div className="grid grid-cols-8 gap-2 place-items-start md:place-items-center">
                        <label className="text-lg col-span-12 md:col-span-2 text-secondary-color">Name</label>
                        <input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={e => handleFormDataChange('name', e.target.value)}
                            className="w-full p-4 bg-secondary-color/30 rounded-md col-span-12 md:col-span-6 focus:outline-none focus:ring focus:border-accent-color"
                        />
                    </div>

                    <div className="grid grid-cols-8 gap-2  place-items-start md:place-items-center">
                        <div className='col-span-4 grid grid-cols-8 place-items-start md:place-items-center'>
                            <label className="text-lg col-span-12 md:col-span-4 text-secondary-color text-right pr-6">Pricing</label>
                            <input
                                placeholder="₹ "
                                name="price"
                                type="number"
                                min="0"
                                value={newProduct.price}
                                onChange={e => handleFormDataChange('price', e.target.value)}
                                className="w-full p-4 bg-secondary-color/30 rounded-md col-span-12 md:col-span-4 focus:outline-none focus:ring focus:border-accent-color"
                            />
                        </div>
                        <div className='col-span-4 grid grid-cols-8 place-items-start md:place-items-center'>
                            <label className="text-lg col-span-12 md:col-span-4 text-secondary-color text-right pr-6">Stock Quantity</label>
                            <input
                                placeholder="0 "
                                type="number"
                                name="stock"
                                min="0"
                                value={newProduct.stock}
                                onChange={e => handleFormDataChange('stock', e.target.value)}
                                className="w-full p-4 bg-secondary-color/30 rounded-md col-span-12 md:col-span-4 focus:outline-none focus:ring focus:border-accent-color"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-8 gap-2 place-items-start md:place-items-center">
                        <label className="text-lg col-span-12 md:col-span-2 text-secondary-color">Description</label>
                        <textarea
                            placeholder="Describe the product"
                            name="description"
                            value={newProduct.description}
                            onChange={e => handleFormDataChange('description', e.target.value)}
                            className="w-full p-4 h-24 bg-secondary-color/30 rounded-md col-span-12 md:col-span-6 focus:outline-none focus:ring focus:border-accent-color"
                        />
                    </div>

                    <div className="grid grid-cols-8 gap-2  place-items-start md:place-items-center">
                        <div className='col-span-4 grid grid-cols-8 place-items-start md:place-items-center'>
                            <label className="text-lg col-span-12 md:col-span-4 text-secondary-color text-right pr-6">Category</label>
                            <select
                                placeholder="text"
                                name="category"
                                value={newProduct.category}
                                onChange={e => handleFormDataChange('category', e.target.value)}
                                className="w-full p-4 bg-secondary-color/30 rounded-md col-span-12 md:col-span-4 focus:outline-none focus:ring focus:border-accent-color"
                            >
                                <option key={0} value={null} className='w-full bg-bg-color/50'>Select</option>
                                {catsList.map((option, index) => (
                                    <option key={index} value={option.name} className='w-full bg-bg-color/50'>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col-span-4 grid grid-cols-8 place-items-start md:place-items-center'>
                            <label className="text-lg col-span-12 md:col-span-4 text-secondary-color text-right pr-6">Tag</label>
                            <select
                                placeholder="text"
                                name="tag"
                                value={newProduct.tag}
                                onChange={e => handleFormDataChange('tag', e.target.value)}
                                className="w-full p-4 bg-secondary-color/30 rounded-md col-span-12 md:col-span-4 focus:outline-none focus:ring focus:border-accent-color"
                            >
                                {tagsList.map((option, index) => (
                                    <option key={index} value={option.name} className='w-full bg-bg-color/50'>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-4 grid grid-cols-8 place-items-start md:place-items-center" onClick={toggleProductStatus}>
                        <label className="text-lg col-span-12 md:col-span-2 text-secondary-color">Active</label>
                        <div className="flex items-center justify-center">
                            <div className={`relative w-12 h-6 rounded-full border-2 border-gray-800 ${newProduct.active ? 'bg-green-700' : 'bg-rose-700'}`}>
                                <div className={`absolute left-0 top-[-2px] w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${newProduct.active ? 'translate-x-full' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={newProduct.active}
                            className="hidden"
                            onChange={toggleProductStatus}
                        />
                    </div>

                    <div className="w-full flex items-center justify-center" onClick={existingData ? updateProd : saveProduct}>
                        <Button type="submit" text={existingData ? "Update" : "Save"} />
                    </div>
                </div>

                <form onSubmit={handleImageSave} className={`flex flex-col bg-primary-color rounded-lg rounded-b-lg px-2 py-4 max-h-[400px] overflow-y-scroll ${savedProduct || existingData ? "" : "pointer-events-none opacity-50"}`}>
                    <h3 className='text-center'>{!savedProduct ? 'Add Product' : `Add Images to the Product ${savedProduct.pid}`}</h3>
                    <div className="relative flex flex-col md:flex-row justify-start items-center gap-2 py-4 w-full">
                        <div className='py-6 w-full h-full'>
                            {displayImgSave &&
                                <div onClick={handleImageSave}>
                                    <Button text={"Add Image"} type="submit" />
                                </div>
                            }
                            <ImageUploader
                                onFileAdded={(image) => onFileAdded(image)}
                                onFileRemoved={(image) => onFileRemoved(image)}
                                deleteIcon={<PiTrashDuotone className="text-red-500" />}
                                uploadIcon={<PiCameraDuotone className="text-white" />}
                            />
                        </div>
                    </div>
                    {savedProduct || existingData ? (
                        <div className='py-6 w-full flex flex-col'>
                            {(savedProduct || existingData).productImgs.length > 0 && (savedProduct || existingData).productImgs.map((item, key) => (
                                <div className='w-full p-2' key={key}>
                                    <img src={`https://api.theneighbourhoood.com/${item.path}`} className='w-full h-full' alt={`Product Image ${key}`} />
                                    <h1 className='text-white'>{item.filename}</h1>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>No Images Added yet</span>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
