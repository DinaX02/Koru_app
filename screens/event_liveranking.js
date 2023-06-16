import React, { useState, useRef } from "react";
import BottomSheet from 'react-native-simple-bottom-sheet';
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

const Eventliveranking = () => {
    const panelRef = useRef(null);
    const dimensions = useWindowDimensions();

    const coin1 = [
        {
            "id_project": 2,
            "amount": 1500,
            "name_project": "Composto",
            "logo_project": null
        },
        {
            "id_project": 4,
            "amount": 800,
            "name_project": "Koru",
            "logo_project": null
        },
        {
            "id_project": 1,
            "amount": 600,
            "name_project": "Officium",
            "logo_project": null
        },
        {
            "id_project": 5,
            "amount": 400,
            "name_project": "Emme",
            "logo_project": null
        },
        {
            "id_project": 6,
            "amount": 300,
            "name_project": "Cultout",
            "logo_project": null
        }
    ];

    const coin2 = [
        {
            "id_project": 2,
            "amount": 3500,
            "name_project": "Composto",
            "logo_project": null
        },
        {
            "id_project": 6,
            "amount": 2500,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 4,
            "amount": 2200,
            "name_project": "Koru",
            "logo_project": null
        },
        {
            "id_project": 5,
            "amount": 1800,
            "name_project": "Emme",
            "logo_project": null
        },
        {
            "id_project": 1,
            "amount": 800,
            "name_project": "Officium",
            "logo_project": null
        }
    ];

    const coin3 = [
        {
            "id_project": 4,
            "amount": 4000,
            "name_project": "Koru",
            "logo_project": null
        },
        {
            "id_project": 5,
            "amount": 2200,
            "name_project": "Emme",
            "logo_project": null
        },
        {
            "id_project": 2,
            "amount": 2800,
            "name_project": "Composto",
            "logo_project": null
        },
        {
            "id_project": 1,
            "amount": 1600,
            "name_project": "Officium",
            "logo_project": null
        },
        {
            "id_project": 6,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 7,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 8,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 9,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 10,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 11,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        },
        {
            "id_project": 12,
            "amount": 1200,
            "name_project": "Cultout",
            "logo_project": null
        }
    ];




    const [selectedCoin, setSelectedCoin] = useState("coin1");
    const [selectedCoinArray, setSelectedCoinArray] = useState(coin1);// Initialize with coin1

    const handleFilterChange = (coin) => {
        switch (coin) {
            case "coin1":
                setSelectedCoin("coin1");
                setSelectedCoinArray(coin1);
                break;
            case "coin2":
                setSelectedCoin("coin2");
                setSelectedCoinArray(coin2);
                break;
            case "coin3":
                setSelectedCoin("coin3");
                setSelectedCoinArray(coin3);
                break;
            default:
                setSelectedCoin();
                setSelectedCoinArray([]);
                break;
        }
    };

    return (
        <View style={styles.container}>
                {/* filter */}
                <View style={styles.filter}>
                    <TouchableOpacity onPress={() => handleFilterChange("coin1")}>
                        <Text style={selectedCoin === "coin1" ? styles.filteroptionselected : styles.filteroption}>Coin1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterChange("coin2")}>
                        <Text style={selectedCoin === "coin2" ? styles.filteroptionselected : styles.filteroption}>Coin2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterChange("coin3")}>
                        <Text style={selectedCoin === "coin3" ? styles.filteroptionselected : styles.filteroption}>Coin3</Text>
                    </TouchableOpacity>
                </View>

                {/* podium */}
                <View style={styles.podium}>
                    <View style={styles.currentcoin}><Image style={styles.currentcoinimg} source={require("../assets/coin_red.png")}/></View>
                    <View style={styles.podiumproject}>
                        <Image
                            style={styles.podiumimage}
                            source={require("../assets/image_welcome.png")}
                        />
                        <Text style={styles.podiumprojecttitle}>{selectedCoinArray[1].name_project}</Text>
                        <Text style={styles.podiumprojectcoins}>{selectedCoinArray[1].amount}</Text>
                    </View>
                    <View style={styles.podiumproject1}>
                        <Text style={styles.podiumplace}>1</Text>
                        <Image
                            style={styles.podiumimage}
                            source={require("../assets/image_welcome.png")}
                        />
                        <Text style={styles.podiumprojecttitle}>{selectedCoinArray[0].name_project}</Text>
                        <Text style={styles.podiumprojectcoins}>{selectedCoinArray[0].amount}</Text>
                    </View>
                    <View style={styles.podiumproject}>
                        <Image
                            style={styles.podiumimage}
                            source={require("../assets/image_welcome.png")}
                        />
                        <Text style={styles.podiumprojecttitle}>{selectedCoinArray[2].name_project}</Text>
                        <Text style={styles.podiumprojectcoins}>{selectedCoinArray[2].amount}</Text>
                    </View>

                </View>

                <ScrollView contentContainerStyle={styles.projects}>
                    {selectedCoinArray.slice(3).map((project, index) => {
                        const i = index + 4;
                        return (
                            <TouchableOpacity
                                onPress={() => panelRef.current.togglePanel()}
                                key={project.id_project}
                                style={styles.project}
                            >
                                <View style={styles.project_info}>
                                    <Text
                                        style={{
                                            width: 30,
                                            textAlign: "center",
                                            marginRight: 15,
                                            color: "grey",
                                            fontWeight: 800,
                                        }}
                                    >{i}</Text>
                                    <Image
                                        style={styles.projectimage}
                                        source={require("../assets/image_welcome.png")}
                                    />
                                    <Text>{project.name_project}</Text>
                                </View>
                                <Text>{project.amount}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            <BottomSheet
                isOpen={false}
                sliderMinHeight={0}
                sliderMaxHeight={dimensions.height - 300}
                ref={ref => panelRef.current = ref}
            >
                <ScrollView
                    style={{
                        height: dimensions.height - 300,
                    }}
                >
                    <Text style={{ paddingVertical: 20 }}>
                        Some random content
                    </Text>
                    <Text style={{ paddingVertical: 20 }}>
                        Some random content
                    </Text>
                </ScrollView>

            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    podiumplace:{
        borderWidth: 1,
        borderColor: "#2F2E5F",
        right: 6,
        top: 5,
        backgroundColor: "gold",
        width: 20,
        height: 20,
        textAlign: "center",
        borderRadius: 10,
        fontWeight: 800,
        position: "absolute",
        zIndex: 5,
    },
    podiumimage:{
        borderWidth: 1,
        borderColor: "#2F2E5F",
        height: 90,
        aspectRatio: 1,
        borderRadius: 50,
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
        backgroundColor: "#7370e0",
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 15,
    },
    filteroptionselected: {
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#2F2E5F",
        padding: 5,
        paddingVertical: 2,
        borderRadius: 5,
        color: "white",
        textAlign: "center",
        marginLeft: 12,
        borderColor: "#2F2E5F",
        borderWidth: 1,
    },
    filteroption:{
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "whitesmoke",
        padding: 5,
        paddingVertical: 2,
        borderRadius: 5,
        color: "#9A9A9A",
        borderColor: "#9A9A9A",
        borderWidth: 1,
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
        borderRadius: 25,
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
