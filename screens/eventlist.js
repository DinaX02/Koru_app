import React, { useState } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    useWindowDimensions,
} from "react-native";

import FooterMenu from "../components/MenuFooter";
import {withSpring} from "react-native-reanimated";


const Eventlist = () => {
    const [selectedTab, setSelectedTab] = useState("about");
    const [selectedStatus, setSelectedStatus] = useState("Ongoing");
    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/background.png")}
                style={styles.backgroundImage}
            >
                <View style={styles.header}>
                    <Text style={styles.eventTitle}>My Event List</Text>
                </View>

                {/* filter*/}

                <View style={styles.filter}>
                    <View style={styles.listoptions}>
                        <Text style={styles.filteroption}>Active</Text>
                        <Text style={styles.filteroptionselected}>Inactive</Text>
                    </View>
                    <View style={styles.selectall}></View>

                </View>
                <View style={styles.newevent}>
                    <Text style={styles.eventtext}>Join a new Event</Text>
                    <View style={styles.scanview}>
                        <Text style={styles.eventtext}>Scan here</Text>
                        <View style={styles.qrcodeview}>
                            <Image style={styles.qrcode} source={require("../assets/qr_code.png")}/>
                        </View>

                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.projects}>
                    <TouchableOpacity style={styles.project}>
                        <View style={styles.projectcontent}>
                            <Image
                                style={styles.projectimage}
                                source={require("../assets/event_join.png")}
                            />
                            <Text>Media Play 2023</Text>
                        </View>
                        <View style={styles.circle}></View>

                    </TouchableOpacity>
                </ScrollView>

                {/* podium*/}

            </ImageBackground>
            <FooterMenu/>
        </View>
    );
};

const styles = StyleSheet.create({
    listoptions:{
        flexDirection: "row",
        alignItems: "center",
    },
    selectall:{
        height: 20,
        width: 20,
        marginRight: 22,
        backgroundColor: "#2F2E5F",
    },
    eventtext:{
        fontWeight: 700,
        fontSize: 15,
        marginHorizontal: 15,
    },
    scanview:{
        flexDirection: "row",
        alignItems: "center"
    },
    qrcodeview:{
        backgroundColor: "#2F2E5F",
        borderRadius: 25,
        height: 35,
        width: 35,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    qrcode:{
        height: 20,
        width: 20,
    },
    newevent:{
        borderTopColor: "#AEAEAE",
        borderTopWidth: 1,
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    projectimage: {
        height: 40,
        width: 40,
        marginLeft: 20,
        marginRight: 10,
        borderColor: "black",
    },
    projects: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 100,
    },
    project: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        backgroundColor: "white",
        padding: 5,
        width: "90%",
        borderRadius: 10,
        justifyContent: "space-between",
    },
    circle:{
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#2F2E5F",
        marginRight: 20,
    },
    projectcontent:{
        flexDirection: "row",
        alignItems: "center",
    },
    filteroptionselected: {
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#2F2E5F",
        padding: 7,
        paddingVertical: 5,
        borderRadius: 5,
        color: "white",
        textAlign: "center",
        marginLeft: 12,
    },
    filteroption:{
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "whitesmoke",
        padding: 7,
        paddingVertical: 5,
        borderRadius: 5,
        color: "#9A9A9A",
        borderColor: "#9A9A9A",
        borderWidth: 1,
        textAlign: "center",
        marginLeft: 12,
    },
    filter: {
        borderTopColor: "#AEAEAE",
        borderTopWidth: 1,
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
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
        paddingTop: 5,
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

export default Eventlist;