import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    setUserInfo(res.data);
                    AsyncStorage.setItem('userInfo', JSON.stringify(res.data))
                        .then(() => resolve()) // Resolve the Promise on successful login
                        .catch(error => reject(error));
                })
                .catch(e => {
                    console.log(`login error ${e}`);
                    reject(e); // Reject the Promise with the error
                });
        });
    };

    const logout = () => {
        return new Promise((resolve, reject) => {
            try {
                // Perform the necessary actions without the API request
                console.log("Logged out successfully");
                AsyncStorage.removeItem('userInfo')
                    .then(() => {
                        setUserInfo({});
                        resolve(); // Resolve the promise
                    })
                    .catch(error => reject(error));
            } catch (error) {
                console.log(`Logout error: ${error}`);
                reject(error); // Reject the promise with the error
            }
        });
    };

    const isLoggedIn = async () => {
        try {
            const storedUserInfo = await AsyncStorage.getItem('userInfo');
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
            }
        } catch (error) {
            console.log(`is logged in error ${error}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
