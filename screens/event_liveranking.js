import React, { useState, useContext, useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import {BASE_URL} from "../config";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";


const Eventliveranking = () => {
    const [eventRanking, setEventRanking] = useState([]);
    const {eventId, userInfo} = useContext(AuthContext);
    const token = userInfo.token;
    const id_user = userInfo.id_user;
    const [selectedCoin, setSelectedCoin] = useState("");
    const [selectedCoinArray, setSelectedCoinArray] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${BASE_URL}/event/rank/${eventId}`,
                {
                    headers: {
                        Authorization: token,
                        id: id_user,
                    },
                },
            )
            .then(res => {
                const rankingData = res.data;
                setEventRanking(rankingData);
                if (rankingData.length > 0) {
                    const firstCoin = rankingData[0];
                    setSelectedCoin(firstCoin.name_coin);
                    setSelectedCoinArray(firstCoin.projects);
                }
            })
            .catch(e => {
                console.log("error", e);
            });
    }, []);

    useEffect(() => {
        console.log(eventRanking);
    }, [eventRanking]);



    const handleFilterChange = (coin) => {
        setSelectedCoin(coin.name_coin);
        setSelectedCoinArray(coin.projects);
    };

    return (
        <View style={styles.container}>
                {/* filter */}
                <View style={styles.filter}>
                    {eventRanking &&
                    eventRanking.map((coin, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleFilterChange(coin)}
                        >
                            <Text
                                style={
                                    selectedCoin === coin.name_coin
                                        ? styles.filteroptionselected
                                        : styles.filteroption
                                }
                            >
                                {coin.name_coin}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* podium */}
            {selectedCoinArray.length > 0 && (
                <View style={styles.podium}>
                    <View style={styles.currentcoin}>
                        <Image
                            style={styles.currentcoinimg}
                            source={
                                selectedCoin === eventRanking[0].name_coin
                                    ? require("../assets/coin.png")
                                    : selectedCoin === eventRanking[1].name_coin
                                    ? require("../assets/coin_red.png")
                                    : selectedCoin === eventRanking[2].name_coin
                                        ? require("../assets/coin_yellow.png")
                                        : null
                            }
                        />
                    </View>
                    {selectedCoinArray.length >= 2 && (
                        <View style={styles.podiumproject}>
                            <Text style={[styles.podiumplace, { backgroundColor: "silver" }]}>
                                2
                            </Text>
                            <Image
                                style={styles.podiumimage}
                                source={{ uri: `data:image/png;base64,${selectedCoinArray[1].logo_project}` }}
                            />
                            <Text style={styles.podiumprojecttitle}>
                                {selectedCoinArray[1].name_project}
                            </Text>
                            <Text style={styles.podiumprojectcoins}>
                                {selectedCoinArray[1].amount_sum}
                            </Text>
                        </View>
                    )}
                    {selectedCoinArray.length >= 1 && (
                        <View style={styles.podiumproject1}>
                            <Text style={[styles.podiumplace, { backgroundColor: "gold" }]}>1</Text>
                            <Image
                                style={styles.podiumimage}
                                source={{ uri: `data:image/png;base64,${selectedCoinArray[0].logo_project}` }}
                            />
                            <Text style={styles.podiumprojecttitle}>
                                {selectedCoinArray[0].name_project}
                            </Text>
                            <Text style={styles.podiumprojectcoins}>
                                {selectedCoinArray[0].amount_sum}
                            </Text>
                        </View>
                    )}
                    {selectedCoinArray.length >= 3 && (
                        <View style={styles.podiumproject}>
                            <Text style={[styles.podiumplace, { backgroundColor: "#967444" }]}>
                                3
                            </Text>
                            <Image
                                style={styles.podiumimage}
                                source={{ uri: `data:image/png;base64,${selectedCoinArray[2].logo_project}` }}
                            />
                            <Text style={styles.podiumprojecttitle}>
                                {selectedCoinArray[2].name_project}
                            </Text>
                            <Text style={styles.podiumprojectcoins}>
                                {selectedCoinArray[2].amount_sum}
                            </Text>
                        </View>
                    )}
                </View>
            )}

                <ScrollView contentContainerStyle={styles.projects}>
                    {selectedCoinArray && selectedCoinArray.length > 0 && selectedCoinArray.slice(3).length > 0 ? (
                        selectedCoinArray.slice(3).map((project, index) => {
                            const i = index + 4;
                            return (
                                <View key={project.id_project} style={styles.project}>
                                    <View style={styles.project_info}>
                                        <Text
                                            style={{
                                                width: 30,
                                                textAlign: "center",
                                                marginRight: 15,
                                                color: "grey",
                                                fontWeight: 800,
                                            }}
                                        >
                                            {i}
                                        </Text>
                                        <Image
                                            style={styles.projectimage}
                                            source={{ uri: `data:image/png;base64,${project.logo_project}` }}
                                        />
                                        <Text>{project.name_project}</Text>
                                    </View>
                                    <Text>{project.amount_sum}</Text>
                                </View>
                            );
                        })
                    ) : (
                        <Text>{selectedCoinArray && selectedCoinArray.length === 0 ? "No projects available" : "No more projects"}</Text>
                    )}
                </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    podiumplace:{
        borderWidth: 1,
        borderColor: "#2F2E5F",
        right: 5,
        top: 5,
        width: 25,
        height: 25,
        textAlignVertical: "center",
        textAlign: "center",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        fontWeight: 800,
        position: "absolute",
        zIndex: 5,
    },
    podiumimage:{
        borderWidth: 1,
        borderColor: "#2F2E5F",
        height: 90,
        aspectRatio: 1,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 20,
        marginHorizontal: 5,
    },
    project_info:{
        flexDirection: "row",
        alignItems: "center",
    },
    podiumprojectcoins:{
        color: "black",
        fontWeight: "900",
        fontSize: 13,
    },
    podiumprojecttitle:{
        marginTop: -15,
        fontSize: 20,
        color: "white",
        fontWeight: "bold",

    },
    podiumproject1:{
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 15,
    },
    podiumproject:{
        flexDirection: "column",
        alignItems: "center",
        marginTop: 35,
    },
    currentcoinimg:{
        height: 15,
        width: 15,
    },
    currentcoin:{
        backgroundColor: "white",
        width: 40,
        height: 30,
        position: "absolute",
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        top: 15,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,

    },
    podium:{
        backgroundColor: "#6f6bd6",
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 15,
    },
    filteroptionselected: {
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#2F2E5F",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        color: "white",
        textAlign: "center",
        marginLeft: 12,
    },
    filteroption:{
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#efefef",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        color: "#65686b",
        textAlign: "center",
        marginLeft: 12,
    },
    filter: {
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
    },
    sliderdescription: {
        width: "90%",
    },
    slidertitle: {
        margin: 20,
    },
    slidercontent: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
    },
    sliderline: {
        width: 75,
        height: 4,
        backgroundColor: "grey",
        alignSelf: "center",
        borderRadius: 2,
        position: "absolute",
        top: 20,
    },
    projectimage: {
        height: 30,
        width: 30,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginRight: 10,
        borderColor: "black",
    },
    projects: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: 60,
    },
    project: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 5,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 7,
    },

    container: {
        flex: 1,
        backgroundColor: "white",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});

export default Eventliveranking;
