import React, { useState, useContext, useEffect } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    ScrollView, TouchableOpacity, Image,
} from "react-native";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../config";


const Eventschedule = () => {

    const [eventSchedule, setEventSchedule] = useState({});
    const {userInfo} = useContext(AuthContext);
    const token = userInfo.token;
    const id_user = userInfo.id_user;
    const {eventId} = useContext(AuthContext);



    useEffect(() => {
        axios
            .get(
                `${BASE_URL}/event/programa/${eventId}`,
                {
                    headers: {
                        Authorization: token,
                        id: id_user,
                    },
                },
            )
            .then(res => {
                setEventSchedule(res.data);
            })
            .catch(e => {
                console.log("error", e);
            });
    }, []);

    useEffect(() => {
        console.log(eventSchedule);
    }, [eventSchedule]);

    return (

        <View style={styles.container}>


            <ImageBackground
                source={require("../assets/background.png")}
                style={styles.backgroundImage}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    {eventSchedule && eventSchedule.length > 0 ? (
                        eventSchedule.map((schedule, index) => (
                            <View style={styles.timestamp} key={index}>
                                <Text style={styles.number}>{index + 1}</Text>
                                <View>
                                    <Text style={styles.hour}>{schedule.date_schedule ? schedule.date_schedule.split(' ')[1]?.slice(0, -3) : ""}</Text>
                                    <Text style={styles.task}>{schedule.name_schedule}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>No schedule available</Text>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>

    );
};

const styles = StyleSheet.create({
    task:{
        color: "whitesmoke",
        fontWeight: 700,
        fontSize: 15,
    },
    hour: {
        color: "white",
        fontWeight: 800,
        fontSize: 25,
    },
    number:{
        color: "white",
        backgroundColor: "#2F2E5F",
        fontSize: 30,
        fontWeight: 800,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginRight: 20,
    },
    timestamp:{
        width: "80%",
        paddingVertical: 20,
        borderBottomColor: "white",
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    scroll:{
        marginVertical: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 70,
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    header: {
        paddingTop: 40,
        paddingBottom: 10,
        flexDirection: "row",
        backgroundColor: "#2F2E5F",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    eventTitle: {
        flex: 1,
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },
    eventImage: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    navigation: {
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-around",
        paddingTop:5,
    },
    navButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    navButtonText: {
        fontSize: 14,
        color: "#2F2E5F",
    },
    selectedNavButton: {
        borderBottomWidth: 5,
        borderBottomColor: "#2F2E5F",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    selectedNavButtonText: {
        fontWeight: "bold",
    },
});

export default Eventschedule;


