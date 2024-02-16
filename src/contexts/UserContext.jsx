import React, { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAPI, loginAPI, logoutAPI } from "../services/auth";

export const UserContext = createContext();

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(localStorage.getItem("uid") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authenticated") === "false" || null); // Initialize token from localStorage

    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            if (uid) {
                // Fetch user data from the backend using the uid
                const userData = await getUserAPI(uid);

                // Update the user state with the fetched data
                setUser(userData.user);
            }

            if (isAuthenticated === false || uid === null) {
                navigate("/login")
            }
            else {
                return
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        // Fetch user data when the uid changes
        fetchUserData();
    }, [uid, isAuthenticated]);


    const loginAction = async (creds) => {
        try {
            const response = await loginAPI(creds);

            localStorage.setItem("uid", response.user.uid);
            localStorage.setItem("authenticated", true)
            setUser(response.user);
            setUid(response.user.uid);

            !isAuthenticated && navigate("/");
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

            isAuthenticated && navigate("/login");
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
