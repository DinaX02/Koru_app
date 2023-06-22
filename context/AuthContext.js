import React, { createContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    const login = (username, password) => {
        axios
            .post(`${BASE_URL}/user/login/${username}`, {
                username,
                password,
            })
            .then(res => {
                const data = res.data;
                const id_user = data.id_user;
                const token = data.token;
                alert(id_user);
                // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            })
            .catch(e => {
                console.log(`login error ${e}`);
                alert(`login error ${e}`);
            });
    };

    return <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>;
};