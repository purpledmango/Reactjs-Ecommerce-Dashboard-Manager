import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Inventory from "./Inventory";
import Users from "./Users";
import Nav from "../components/Nav";
import Hud from "../components/Hud"
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Login from "./Login";
import { useUser } from "../contexts/UserContext";

const Base = () => {
    const [sideBarVisibility, setSideBarVisibility] = useState(false);
    const { isAuthenticated } = useUser();
    const navigate = useNavigate()

    useEffect(() => {


    }, [isAuthenticated, navigate]);



    return (
        <>
            <div className="w-screen h-full">
                <Nav />

                <div className={`w-full h-full grid grid-cols-12`}>
                    <div className={` h-full ${sideBarVisibility ? "col-span-2 " : "hidden"}`}>
                        <Sidebar />
                    </div>

                    <div className={` ${sideBarVisibility ? "col-span-12 lg:col-span-10" : "col-span-12"} h-auto bg-background-color text-white`}>
                        <Hud visible={sideBarVisibility} setVisible={setSideBarVisibility} />
                        <Routes>

                            <>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/inventory" element={<Inventory />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/login" element={<Login />} />
                            </>


                        </Routes>
                    </div>
                </div>
                <div className="w-full h-full">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Base;
