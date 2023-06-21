import React, {createContext, useState} from 'react';
import {BASE_URL} from "../config";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});

    const login = (username, password) => {

        axios
            .post(`${BASE_URL}/user/login/${username}`, {
                username,
                password,
            })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo);
                setUserInfo(userInfo);
                alert("sucesso")
                //AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            })
            .catch(e => {
                console.log(`login error ${e}`);
                alert("error")
            });
    };


    return(
            <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>
        );

}