import { PiPlusCircleDuotone, PiXCircleDuotone } from "react-icons/pi";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import Button from "../Button";
import { addTag, allTags, deleteTag, updateTag } from "../../services/inventoryAPIS";
import { toast } from "react-toastify";

const TagEditor = ({ data, showEditor, setShowEditor, refreshTags }) => {
    const [tagData, setTagData] = useState(data ? {
        name: data.name,
        description: data.description
    } : {
        name: "",
        description: ""
    });

    const closeEditor = () => {
        setShowEditor(false);
        setTagData({
            name: "",
            description: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTagData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveTag = async () => {
        try {
            await addTag(tagData);
            toast.success("New Tag Added");
            setShowEditor(false);
            refreshTags(); // Refresh tag list
        } catch (error) {
            toast.error("Error while Adding New Tag");
        }
    };

    const deleteConfirmation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
        if (confirmDelete) {
            try {
                await deleteTag(data.tid);
                toast.success("Tag Deleted");
                setShowEditor(false);
                refreshTags(); // Refresh tag list
            } catch (error) {
                toast.error("Error Deleting Tag");
            }
        }
    };

    const handleUpdate = async () => {
        try {
            await updateTag(data.tid, tagData);
            toast.success("Tag Updated");
            setShowEditor(false);
            refreshTags(); // Refresh tag list
        } catch (error) {
            toast.error("Error Updating Tag");
        }
    };

    return (
        <div className='w-[80%] h-full backdrop-blur-xl rounded-xl'>
            <button onClick={closeEditor} className="absolute p-3 text-white-color"><PiXCircleDuotone className="text-3xl" /></button>
            <div className='flex flex-col gap-4  justify-evenly items-center pt-6 '>
                <h5 className='text-center text-xl text-accent-color font-light capitalize'> {data ? "Edit Tag" : "Add Tag"} </h5>
                <div>
                    <label>Name:</label>
                    <input className="focus:ring focus:border-accent-color focus:outline-none bg-secondary-color/30 w-full p-4 rounded-xl" name="name" value={tagData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea className="focus:ring focus:border-accent-color focus:outline-none bg-secondary-color/30 w-full p-4 rounded-xl" name="description" value={tagData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    {!data && <div onClick={saveTag}>
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

const TagManager = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagData, setTagData] = useState([]);

    useEffect(() => {
        // Fetch tag data here
        fetchTagData();
    }, []);

    const fetchTagData = async () => {
        try {
            // Fetch tag data from API
            const response = await allTags();
            setTagData(response.data); // Assuming response.data contains the tag list
        } catch (error) {
            console.error("Error fetching tag data:", error);
        }
    };

    const refreshTags = () => {
        fetchTagData(); // Refresh tag list
    };

    const editTag = (tag) => {
        setSelectedTag(tag);
    };

    const openEditor = () => {
        setShowEditor(true);
    };

    const addCategoryHandler = () => {
        setShowEditor(true);
        setSelectedTag(null);
    };

    return (
        <div className='relative h-96 bg-primary-color/60 p-2 md:p-6 rounded-xl shadow-3xl'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold'> Manage Tags</h3>
                <button onClick={addCategoryHandler} className='flex items-center justify-center text-lg bg-accent-color transition hover:scale-105 ease-in duration-300 px-5 py-2 rounded-xl text-background-color'>
                    <PiPlusCircleDuotone className='text-xl' /> Add
                </button>
            </div>
            <ul className="grid grid-cols-3 gap-4 pt-12 place-items-center">
                {tagData.length > 0 ? (
                    tagData.map((item, key) =>
                        <li onClick={() => { editTag(item); openEditor(); }} className='px-4 py-2 bg-secondary-color text-center w-24 rounded transition hover:scale-105 ease-in duration-300' key={key}>
                            {item.name}
                        </li>
                    )
                ) : (
                    <Spinner />
                )}
            </ul>
            {showEditor && (
                <div className='absolute top-0 pt-12 w-full h-full'>
                    <TagEditor setShowEditor={setShowEditor} data={selectedTag ? selectedTag : null} refreshTags={refreshTags} />
                </div>
            )}
        </div>
    );
};

export default TagManager;
