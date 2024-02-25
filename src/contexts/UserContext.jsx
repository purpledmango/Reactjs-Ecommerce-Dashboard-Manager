import React, { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAPI, loginAPI, logoutAPI } from "../services/auth";

export const UserContext = createContext();

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(localStorage.getItem("uid") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authenticated") === "true" || localStorage.setItem("authenticated", false)); // Initialize token from localStorage

    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            console.log(uid);
            if (uid) {
                // Fetch user data from the backend using the uid
                const userData = await getUserAPI(uid);

                setUser(userData.user);


            }


            else {
                navigate("/login")
            }
        } catch (err) {
            navigate("/login")
            console.error(err);
        }
    };
    useEffect(() => {
        // Fetch user data when the uid changes

        fetchUserData();

    }, [uid]);


    const loginAction = async (creds) => {
        try {
            const response = await loginAPI(creds);
            console.log(response, "login response");
            localStorage.setItem("uid", response.user.uid);
            localStorage.setItem("authenticated", true)
            setUser(response.user);
            setUid(response.user.uid);
            setIsAuthenticated(true);
            navigate("/"); // Navigate after setting isAuthenticated to true
            return response.user;
        } catch (err) {
            console.error(err);
        }
    };
    const logoutAction = async () => {
        try {
            const response = await logoutAPI()
            setUser(null);
            setUid(null);
            localStorage.removeItem("uid");
            localStorage.setItem("authenticated", false);


            navigate("/login");

        } catch (error) {
            console.log("Error while Logging you out")
        }
    };


    return { uid, isAuthenticated, user, loginAction, logoutAction };
};

export const UserProvider = ({ children }) => {
    const userContext = useUser(); // Use useUser
    return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};
