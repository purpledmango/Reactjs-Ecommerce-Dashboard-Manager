import { PiPlusCircleDuotone, PiXCircleDuotone } from "react-icons/pi";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import Button from "../Button";
import { addCategory, allCategories, deleteCategory, updateCategory } from "../../services/inventoryAPIS"; // Assuming there is an allCategories function in your service
import { toast } from "react-toastify";

const CategoryEditor = ({ data, showEditor, setShowEditor, refreshCategories }) => {
    const [catData, setCatData] = useState(data ? {
        name: data.name,
        description: data.description
    } : {
        name: "",
        description: ""
    });

    const closeEditor = () => {
        setShowEditor(false);
        setCatData({
            name: "",
            description: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCatData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveCategory = async () => {
        try {
            await addCategory(catData);
            toast.success("New Category Added");
            setShowEditor(false);
            refreshCategories(); // Refresh category list
        } catch (error) {
            toast.error("Error while Adding New Category");
        }
    };

    const deleteConfirmation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await deleteCategory(data.cid); // Assuming there is an id property in your category data
                toast.success("Category Deleted");
                setShowEditor(false);
                refreshCategories(); // Refresh category list
            } catch (error) {
                toast.error("Error Deleting Category");
            }
        }
    };

    const handleUpdate = async () => {
        try {
            await updateCategory(data.cid, catData);
            toast.success("Category Updated");
            setShowEditor(false);
            refreshCategories(); // Refresh category list
        } catch (error) {
            toast.error("Error Updating Category");
        }
    };

    return (
        <div className='w-[80%] h-full backdrop-blur-xl rounded-xl'>
            <button onClick={closeEditor} className="absolute p-3 text-white-color"><PiXCircleDuotone className="text-3xl" /></button>
            <div className='flex flex-col gap-4  justify-evenly items-center pt-6 '>
                <h5 className='text-center text-xl text-accent-color font-light capitalize'> {data ? "Edit Category" : "Add Category"} </h5>
                <div>
                    <label>Name:</label>
                    <input className="focus:ring focus:border-accent-color focus:outline-none bg-secondary-color/30 w-full p-4 rounded-xl" name="name" value={catData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea className="focus:ring focus:border-accent-color focus:outline-none bg-secondary-color/30 w-full p-4 rounded-xl" name="description" value={catData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    {!data && <div onClick={saveCategory}>
                        <Button text={"Save"} />
                    </div>}
                </div>
                {
                    data && (
                        <div className="flex  gap-4">
                            <div onClick={handleUpdate}>
                                <Button className="!bg-rose-500" text={"Update"} />
                            </div>
                            <div onClick={deleteConfirmation}>
                                <Button className="!bg-rose-500" text={"Delete"} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

const CategoryManager = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchCategories(); // Fetch categories when the component mounts
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await allCategories(); // Assuming allCategories returns the list of categories
            setCategoryData(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const refreshCategories = () => {
        fetchCategories(); // Refresh categories
    };

    const editCategory = (cat) => {
        setSelectedCategory(cat);
    };

    const openEditor = () => {
        setShowEditor(true);
    };

    const addCategoryHandler = () => {
        setShowEditor(true);
        setSelectedCategory(null);
    };

    return (
        <div className='relative h-96 bg-primary-color/60 p-2 md:p-6 rounded-xl shadow-3xl'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold'> Categories</h3>
                <button onClick={addCategoryHandler} className='flex items-center justify-center text-lg bg-accent-color transition hover:scale-105 ease-in duration-300 px-5 py-2 rounded-xl text-background-color'>
                    <PiPlusCircleDuotone className='text-xl' /> Add
                </button>
            </div>
            <ul className="grid grid-cols-3 gap-4 pt-12 place-items-center">
                {categoryData ? (
                    categoryData.map((item, key) =>
                        <li onClick={() => { editCategory(item); openEditor(); }} className='px-4 py-2 bg-secondary-color text-center w-24 rounded transition hover:scale-105 ease-in duration-300' key={key}>
                            {item.name}
                        </li>
                    )
                ) : (
                    <Spinner />
                )}
            </ul>
            {showEditor && (
                <div className='absolute top-0 pt-12 w-full h-full'>
                    <CategoryEditor setShowEditor={setShowEditor} data={selectedCategory ? selectedCategory : null} refreshCategories={refreshCategories} />
                </div>
            )}
        </div>
    );
};

export default CategoryManager;
