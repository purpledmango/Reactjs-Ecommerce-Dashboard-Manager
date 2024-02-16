import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addUserApi, allUserKPI, staffUsers, updateUserApi, usersThisMonth, usersThisWeek } from "../services/usersAPis";
import KPI from "../components/KPI";
import Spinner from "../components/Spinner";
import UsersTable from "../components/Widgets/UsersTable";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";

const UserForm = ({ data, setSelectedUser }) => {
    useEffect(() => { }, [data])
    const [formData, setFormData] = useState(data ? {
        name: data.name,
        email: data.email,
        password: "",
        confirmPassword: "",
        group: data.group // Default role is User
    } : {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        group: "Staff" // Default role is User
    });

    const roles = ["Admin", "Staff", "User"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUserSave = () => {
        try {
            const addedUser = addUserApi(formData); // Await the addUserApi function

            // Display success toast using toast.promise
            toast.promise(
                addedUser,
                {
                    loading: "Adding user...",
                    success: "User added successfully",
                    error: "Failed to add user",
                }
            );
        } catch (error) {
            // Display error toast
            toast.error("Failed During Registration");
            console.error("Error adding user:", error);
        }
    };

    const handleUpdateUser = () => {
        try {
            const res = updateUserApi(data.uid, formData); // Await the addUserApi function

            // Display success toast using toast.promise
            toast.promise(
                res,
                {
                    loading: "Updating user...",
                    success: "Updated User successfully",
                    error: "Failed to update user",
                }
            );
        } catch (error) {
            // Display error toast
            toast.error("Failed During Registration");
            console.error("Error adding user:", error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted with data:", formData);
        setSelectedUser(null); // Reset selectedUser when form is submitted
    };

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col gap-4`}>
            <label className="text-xl text-secondary-color flex justify-start">Name</label>
            <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full p-4 rounded-xl bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" />

            <label className="text-xl text-secondary-color flex justify-start" htmlFor="email">Email:</label>
            <input className="w-full p-4 rounded-xl bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

            {!data && (<>
                <label className="text-xl text-secondary-color flex justify-start" htmlFor="password">Password:</label>
                <input className="w-full p-4 rounded-xl bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

                <label className="text-xl text-secondary-color flex justify-start" htmlFor="repeatPassword">Repeat Password:</label>
                <input className="w-full p-4 rounded-xl bg-secondary-color/30 focus:outline-none focus:ring focus:border-accent-color" type="password" id="repeatPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

            </>)}
            <label className="text-xl text-secondary-color flex justify-start" htmlFor="role">Role:</label>
            <select className="w-full p-4 rounded-xl bg-secondary-color/20 focus:outline-none focus:ring focus:border-accent-color" id="role" name="group" value={formData.group} onChange={handleInputChange}>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                ))}
            </select>

            {data ? (<div className="" onClick={handleUpdateUser}>
                <Button text={"Update User"} />
            </div>) :
                (<div className="" onClick={handleUserSave}>
                    <Button text={"Add User"} />
                </div>)}
        </form>
    )
}

const Users = () => {

    const { user } = useUser()
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [allUsersN, setAllUsersN] = useState(null);
    const [usersWeekly, setUsersWeekly] = useState(null);
    const [usersMonthly, setUsersMonthly] = useState(null);
    const [staff, setStaff] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null)

    const fetchKPI = async () => {
        try {
            const allUsers = await allUserKPI();
            setAllUsersN(allUsers.data);
            const weeklyUr = await usersThisWeek();
            setUsersWeekly(weeklyUr.data);
            const monthlyRes = await usersThisMonth();
            setUsersMonthly(monthlyRes.data);
            const staffRes = await staffUsers();
            setStaff(staffRes.data);
        } catch (error) {
            console.error("Error while fetching KPI:", error);
        }
    };

    useEffect(() => {
        fetchKPI();
        document.title = "Users - The NeighbourHOOOD Admin Dashboard";
    }, []);

    useEffect(() => {

    }, [selectedUser]);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        setSelectedUser(null);
    };

    return (
        <div className="w-full h-auto bg-background-color p-4 md:p-12">
            <div className="flex flex-col md:flex-row gap-4">
                <KPI kpiName={"All Users"} kpiData={allUsersN ? allUsersN : <Spinner />} />
                <KPI kpiName={"New Users this Week"} kpiData={usersWeekly ? usersWeekly : 0} />
                <KPI kpiName={"New Users this Month"} kpiData={usersMonthly ? usersMonthly : <Spinner />} />
            </div>
            <div className="my-6">
                <div className="py-6">
                    <UsersTable name={"Staff Members"} toggleForm={toggleForm} data={staff} setSelectedUser={setSelectedUser} setIsFormOpen={setIsFormOpen} />
                </div>
                {(user && user.group === "Admin") && <div>
                    {isFormOpen ?
                        (<div onClick={toggleForm}>
                            <Button text={"Close"} />
                        </div>) : (<div onClick={toggleForm}>
                            <Button text={"Add"} />
                        </div>)}
                </div>}
                {(isFormOpen && user.group === "Admin") && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
                        <div className="bg rounded-xl bg-primary-color p-6">
                            <UserForm data={selectedUser} setSelectedUser={setSelectedUser} />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Users;
