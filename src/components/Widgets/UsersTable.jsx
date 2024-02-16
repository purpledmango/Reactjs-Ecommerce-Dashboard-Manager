import { useEffect } from "react";
import { useTable } from "react-table";
import Spinner from "../Spinner";
import { BiPencil } from "react-icons/bi";

const UsersTable = ({ name, data, setSelectedUser, setIsFormOpen, }) => {
    useEffect(() => { }, [data])
    const handleEdit = (item) => {
        setSelectedUser(item)
        setIsFormOpen(true)
    }
    return (
        <div className="w-full">
            <h1 className="text-center text-2xl text-primary-color p-6 font-semibold"> {name}</h1>

            <div className=" bg-primary-color rounded-t-2xl rounded-b-xl px-2 md:px-4 py-4 md:py-4">
                <table className="table-auto w-full text-text-color mx-auto ">
                    <thead className="capitalize text-secondary-color">
                        <tr>
                            <th>UID</th>
                            <th>Name</th>
                            <th>Emails</th>
                            <th>Group</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            data.map((item, key) => {
                                return (
                                    <tr key={key} className="hover:bg-secondary-color/20 rounded-xl border-b-[2px] border-secondary-color/10">
                                        <td className="p-5">{item.uid}</td>
                                        <td className="p-5">{item.name}</td>
                                        <td className="p-5">{item.email}</td>
                                        <td className="p-5">{item.group}</td>
                                        <td className="p-5">
                                            <BiPencil className="text-3xl" onClick={() => handleEdit(item)} />
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center"><Spinner /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
