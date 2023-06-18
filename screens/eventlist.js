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
import { useNavigation } from '@react-navigation/native';

const Eventlist = () => {
    const navigation = useNavigation();

    const events = [
        {
            name_event: "Event 1",
            start_date: "2023-06-12T10:00:00",
            end_date: "2023-06-26T12:00:00",
        },
        {
            name_event: "Event 2",
            start_date: "2023-06-13T14:00:00",
            end_date: "2023-06-13T16:00:00",
        },
        {
            name_event: "Event 3",
            start_date: "2023-06-15T09:00:00",
            end_date: "2023-06-15T12:00:00",
        },
        {
            name_event: "Event 4",
            start_date: "2023-06-17T16:00:00",
            end_date: "2023-06-17T18:00:00",
        },
        {
            name_event: "Event 5",
            start_date: "2023-06-18T13:00:00",
            end_date: "2023-06-18T15:00:00",
        },
    ];

    const [filter, setFilter] = useState("active");

    const currentDate = new Date();

    const filteredEvents = events.filter((event) => {
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        return (
            (filter === "all" ||
                (filter === "active" &&
                    currentDate >= startDate &&
                    currentDate <= endDate) ||
                (filter === "inactive" &&
                    (currentDate < startDate || currentDate > endDate)))
        );
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/background.png")}
                style={styles.backgroundImage}
            >
                <View style={styles.newevent}>
                    <Text style={styles.eventtext}>Join a new Event</Text>
                    <View style={styles.scanview}>
                        <Text style={styles.eventtext}>Scan here</Text>
                        <View style={styles.qrcodeview}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ScanQrCode')}
                            >
                                <Image style={styles.qrcode} source={require("../assets/qr_code.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* filter */}

                <View style={styles.filter}>
                    <View style={styles.listoptions}>
                        <TouchableOpacity onPress={() => setFilter("active")}>
                            <Text
                                style={[
                                    styles.filteroption,
                                    filter === "active" && styles.filteroptionselected,
                                ]}
                            >
                                Active
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFilter("inactive")}>
                            <Text
                                style={[
                                    styles.filteroption,
                                    filter === "inactive" && styles.filteroptionselected,
                                ]}
                            >
                                Inactive
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setFilter("all")}>
                        <Image
                            source={filter === "all" ? require("../assets/select_all_active.png") : require("../assets/select_all_new.png")}
                            style={styles.selectall}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.projects}>
                    {filteredEvents.map((event, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Event')}
                            style={styles.project}
                        >
                            <View style={styles.projectcontent}>
                                <Image
                                    style={styles.projectimage}
                                    source={require("../assets/image_welcome.png")}
                                />
                                <Text>{event.name_event}</Text>
                            </View>
                            <View style={styles.circle} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* podium */}
            </ImageBackground>
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
        borderRadius: 20,
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
