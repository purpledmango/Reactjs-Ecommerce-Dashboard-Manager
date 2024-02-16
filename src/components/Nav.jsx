import React, { useEffect, useState } from "react";
import { FiMenu, FiX, FiAirplay, FiShoppingCart, FiUsers, FiTruck, FiSmile } from "react-icons/fi";
import { panelBranding } from "../constants/dashboardConfig";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
const menuData = [
    {
        label: "Dashboard",
        path: "/",
        icon: <FiAirplay />,
    },
    {
        label: "Inventory",
        path: "/inventory",
        icon: <FiShoppingCart />,
    },
    {
        label: "Users",
        path: "/users",
        icon: <FiUsers />,
    },
    {
        label: "Reviews",
        path: "/review",
        icon: <FiSmile />,
    },
    {
        label: "Orders",
        path: "/orders",
        icon: <FiTruck />,
    },
];

const Nav = () => {
    const [mobMenu, setMobMenu] = useState(false);
    // const { user } = useUser()
    const location = useLocation();


    const { uid } = useUser()


    return (
        <nav className="w-full bg-gray-900 text-white p-4 h-full lg:hidden">
            <div className="flex justify-between items-center block lg:hidden gap-2">
                <button onClick={() => setMobMenu(!mobMenu)} className="text-2xl">
                    <FiMenu />
                </button>
                <div className="w-full">
                    <h1 className="text-2xl font-bold text">{panelBranding}</h1>
                </div>
            </div>
            {/* Mobile Menu */}
            {mobMenu && <div className={`mt-2 block lg:hidden absolute inset-0 z-50`}>

                <div className="w-full h-full flex items-center justify-between text-typography-color">
                    <motion.ul className="w-3/4 bg-background-color/70  backdrop-blur-xl h-full py-5 px-3"
                        initial={{
                            x: "-100vw"

                        }}

                        animate={{ x: 0 }}
                    >
                        {
                            menuData.map((item, index) => (
                                <li key={index} className="mb-2 text-2xl flex justify-start items-center gap-4 py-3">
                                    <span className="">{item.icon}</span>
                                    <Link
                                        to={item.path}
                                        className={` hover:underline ${location.pathname === item.path ? "font-bold" : ""}`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </motion.ul>
                    <div className="p-5">
                        <button
                            onClick={() => setMobMenu(!mobMenu)}
                            className="text-2xl p-5 bg-gray-500 rounded-full"
                        >
                            <FiX />
                        </button>
                    </div>
                </div>
            </div>}


            {/* End Mobile Menu */}

            {/* Menu for Larger Screens */}


        </nav >
    );
};

export default Nav;
