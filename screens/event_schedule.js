import React, { useState } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,ScrollView,
} from "react-native";

import FooterMenu from "../components/MenuFooter";

const Eventschedule = () => {
    const [selectedTab, setSelectedTab] = useState("about");
    const [selectedStatus, setSelectedStatus] = useState("Closed");
    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
    };

    const getImageSource = () => {
        if (selectedStatus === "Ongoing") {
            return require("../assets/ongoing_green.png");
        } else if (selectedStatus === "Closed") {
            return require("../assets/Closed_red.png");
        } else if (selectedStatus === "Upcoming") {
            return require("../assets/upcoming_yellow.png");
        }

        return require("../assets/ongoing_green.png"); // Imagem padrão caso não haja correspondência
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.eventTitle}>Titulo do Evento</Text>
                <Image
                    source={require("../assets/event_img_test.png")}
                    style={styles.eventImage}
                />
            </View>

            <View style={styles.navigation}>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        selectedTab === "about" && styles.selectedNavButton,
                    ]}
                    onPress={() => handleTabPress("about")}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            selectedTab === "about" && styles.selectedNavButtonText,
                        ]}
                    >
                        About
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navButton,
                        selectedTab === "voting" && styles.selectedNavButton,
                    ]}
                    onPress={() => handleTabPress("voting")}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            selectedTab === "voting" && styles.selectedNavButtonText,
                        ]}
                    >
                        Voting
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navButton,
                        selectedTab === "liveRanking" && styles.selectedNavButton,
                    ]}
                    onPress={() => handleTabPress("liveRanking")}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            selectedTab === "liveRanking" && styles.selectedNavButtonText,
                        ]}
                    >
                        Live Ranking
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navButton,
                        selectedTab === "schedule" && styles.selectedNavButton,
                    ]}
                    onPress={() => handleTabPress("schedule")}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            selectedTab === "schedule" && styles.selectedNavButtonText,
                        ]}
                    >
                        Schedule
                    </Text>
                </TouchableOpacity>
            </View>

            <ImageBackground
                source={require("../assets/background.png")}
                style={styles.backgroundImage}
            >
                <ScrollView contentContainerStyle={styles.scroll}>

                    <View style={styles.timestamp}>
                        <Text style={styles.number}>1</Text>
                        <View>
                            <Text style={styles.hour}>9:00</Text>
                            <Text style={styles.task}>Opening Show</Text>
                        </View>
                    </View>
                    <View style={styles.timestamp}>
                        <Text style={styles.number}>2</Text>
                        <View>
                            <Text style={styles.hour}>10:00</Text>
                            <Text style={styles.task}>Projects</Text>
                        </View>
                    </View>
                    <View style={styles.timestamp}>
                        <Text style={styles.number}>3</Text>
                        <View>
                            <Text style={styles.hour}>11:30</Text>
                            <Text style={styles.task}>Coffee Break</Text>
                        </View>
                    </View>
                    <View style={styles.timestamp}>
                        <Text style={styles.number}>4</Text>
                        <View>
                            <Text style={styles.hour}>12:00</Text>
                            <Text style={styles.task}>Voting</Text>
                        </View>
                    </View>
                    <View style={styles.timestamp}>
                        <Text style={styles.number}>5</Text>
                        <View>
                            <Text style={styles.hour}>19:00</Text>
                            <Text style={styles.task}>Awards</Text>
                        </View>
                    </View>
                </ScrollView>
                <FooterMenu/>
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
        borderRadius: 8,
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


