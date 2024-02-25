import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { RxAvatar } from "react-icons/rx";
import { PiCrossDuotone, PiHamburgerDuotone, PiListDuotone, PiPencilSlashDuotone, PiUserCircleDuotone, PiX, PiXCircleDuotone } from "react-icons/pi";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const Hud = ({ visible, setVisible, user }) => {
    const { logoutAction } = useUser()

    const [showLogout, setShowLogout] = useState(false)


    const handleLogout = () => {
        try {
            const response = logoutAction();
            Cookies.remove("connect.sid")
            toast.success("Logged Out")
        } catch (error) {
            console.log(error)
        }

    }
    console.log("Hud user data", user)

    return (
        <div className="w-full md:h-24 bg-background-color text-white px-6">
            <div className="flex justify-between items-center w-full gap-2">
                <div className="text-4xl w-full ml-8 mt-2 hidden md:flex p-2">
                    <button onClick={() => setVisible(!visible)}>
                        {visible ? < PiXCircleDuotone /> : <PiListDuotone />}
                    </button>
                </div>
                <div className="w-full h-10 pt-2 ">
                    <input className="w-full h-full  text-accent-color font-xl rounded-xl" />
                </div>
                <div className="w-full">
                    <div className="flex justify-end items-center mr-4 pr-4 pt-4 gap-4" onClick={() => setShowLogout(!showLogout)}>
                        <PiUserCircleDuotone className="text-6xl text-accent-color" />
                        <div className="flex flex-col">
                            <span className="text-lg">
                                {user ? user.name : "Anonymous"}
                            </span>
                            <span className="font-bold text-xs text-secondary-color uppercase">
                                {user ? user.group : "user"}
                            </span>
                        </div>
                    </div>
                </div>
                {showLogout && (
                    <motion.div
                        initial={{ x: 65 }}
                        animate={{ x: 0 }}
                        exit={{ x: 65 }} // Slide out to the right on exit
                        // transition={{
                        //     type: "spring",
                        //     stiffness: 260,
                        //     damping: 20
                        // }}
                        className="h-48 w-48 absolute top-0 right-0 "
                    >
                        <div className=" flex flex-col jusitfy-evenly items-start gap-4 bg-primary-color/80 p-4 rounded-xl shadow-3xl shadow-green-400 ">


                            <div className="  text-3xl" onClick={() => setShowLogout(!showLogout)} > <PiXCircleDuotone /></div>
                            <button className="flex items-center justify-center px-4 py-2 bg-rose-600 rounded-xl" onClick={handleLogout}><PiPencilSlashDuotone />Logout</button>



                        </div>
                    </motion.div>
                )}
            </div>
        </div >
    );
}

export default Hud;
