import React, { useState } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    ScrollView,
} from "react-native";


const Eventschedule = () => {

    return (

        <View style={styles.container}>


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
                            <Text style={styles.hour}>12:00 - 18:30</Text>
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


