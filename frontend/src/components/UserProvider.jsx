//React
import { useState, useEffect, createContext } from "react";
// Firebase
import { auth } from "../config/firebase";
// API
import { getUserName } from "../services/api";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userName, setUserName] = useState("{undefined user}");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const data = await getUserName(token);
                    setUserName(data.username);
                } catch (err) {
                    console.log("[ERROR] UserProvier.jsx/onAuthStateChanged: ", err);
                }
            } else {
                setUserName("{undefined user}");
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;