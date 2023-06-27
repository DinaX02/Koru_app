import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

const JoinEventAfterScan = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { eventName, coinType, amount, tokens } = route.params;

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View>
        <TouchableOpacity style={styles.logoutBtn}   onPress={() => navigation.goBack()}>
          <Image
              style={styles.logOut}
              source={require("../assets/seta_back.png")}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_litle_hompeage.png")}
        />
      </View>

      <View style={styles.eventContainer}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={styles.eventImage}
              source={require("../assets/event_join.png")} //img do evento
            />
          </View>
        </View>

        <Text style={styles.eventName}>{eventName}</Text>

        <Text style={styles.eventDescription}>
          Join {eventName} with {amount} {coinType} coins?
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
    width: 150,
    marginTop: 30,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
  },
  eventImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    alignSelf: "center",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventDescription: {
    marginTop: 20,
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
  logoutBtn: {
    top: 20,
    left: 20,
  },
  logOut: {
    marginTop: 30,
    width: 30,
    height: 30,
  },
});

export default JoinEventAfterScan;
