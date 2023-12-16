//@ts-nocheck

import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from '../../../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const { user } = result;
                if (isUserAllowed(user)) {
                    setUser(user);
                } else {
                    // User is not allowed, sign out
                    signOut(auth);
                }
            })
            .catch((error) => {
                console.log("Error signing in with Google:", error);
            });
    };

    const logOut = () => {
        signOut(auth);
    };

    const isUserAllowed = (user) => {
        const allowedEmails = ["tonhodzaicollins@gmail.com", "denis.siduna@gmail.com"];
        return allowedEmails.includes(user.email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && isUserAllowed(currentUser)) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};