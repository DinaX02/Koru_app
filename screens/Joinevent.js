import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";


const JoinEventAfterScan = () => {


  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >

<View style={styles.logoutBtn}>
        <Image
          style={styles.logOut}
          source={require("../assets/seta_back.png")}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_litle_hompeage.png")} 
        />
      </View>

      <View style={styles.eventContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.eventImage}
            source={require("../assets/logo_litle_hompeage.png")} // colocar img do evento
          />
        </View>

        <Text style={styles.eventName}>Event Name</Text>

        <Text style={styles.eventDescription}>
        Media Play is an event organized by DeCA, where the students present the best projects developed in the DeCA's Communication Sciences and Technologies courses, covering all study cycles. 

All the projects were selected by a jury, based on the proposals presented by the students.
        </Text>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>


    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 230,
    height: 61,
  },
  eventContainer: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },
  joinButton: {
    backgroundColor: "#2F2E5F",
    padding: 10,
    borderRadius: 20,
    width:150,
    marginTop:30,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventDescription: {
    marginTop:20,
    width: "100%",
    textAlign: "left",
  },
  logoutBtn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  logOut: {
    marginTop:30,
    width: 30,
    height: 30,
  },
});

export default JoinEventAfterScan;


