import { menuData } from "../constants/menuNavData";
import { RxDashboard } from "react-icons/rx";
import { PiPackage, PiUsersBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { LiaTruckSolid } from "react-icons/lia";
import { motion } from "framer-motion";

const menuIcons = [<RxDashboard />, <PiPackage />, <PiUsersBold />, <LiaTruckSolid />];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div

            className="flex flex-col w-full h-full hidden lg:block bg-primary-color transition-transform"
        >
            {/* Branding */}
            <div className="py-12">
                <h1 className="text-center text-white text-2xl font-semibold"> Silk Store Express </h1>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4 h-full flex items-center  mx-4 transition-all -translate-x-0">
                {menuData.map((item, key) => (
                    <Link to={item.route} key={key} className="text-xl w-full flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 0.9 }} // Increase scale on hover
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.05, ease: "easeIn" }} // Framer Motion transition
                            className={`h-12 px-4 w-full flex items-center justify-start transition-transform ${location.pathname === item.route ? "bg-accent-color rounded-2xl shadow-2xl" : ""
                                }`}
                        >
                            <span className="text-white text-3xl text-secondary-color">{menuIcons[key]}</span>
                            <span className={`ml-2  ${location.pathname === item.route ? "text-background-color font-semibold" : "text-white"}`}>
                                {item.name}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
