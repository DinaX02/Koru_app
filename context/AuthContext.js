import React, { createContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`${BASE_URL}/user/login/${username}`, {
                    username,
                    password,
                })
                .then(res => {
                    setUserInfo(res.data)
                    // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    resolve(); // Resolve the Promise on successful login
                })
                .catch(e => {
                    console.log(`login error ${e}`);
                    reject(e); // Reject the Promise with the error
                });
        });
    };

    return <AuthContext.Provider value={{
        userInfo,
        login,
    }}>{children}</AuthContext.Provider>;
};