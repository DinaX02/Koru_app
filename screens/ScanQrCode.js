import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import QrCodeReader from "../components/QrCodeReader";

const ScanQrCode = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <TouchableOpacity style={styles.logoutBtn}    onPress={() => navigation.navigate('Homepage')}>
          <Image
            style={styles.logOut}
            source={require("../assets/seta_back.png")}
          />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_litle_hompeage.png")}
        />
        <Text style={styles.scanText}>Scan the QR code</Text>
      </View>

      <QrCodeReader />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  topBar: {
    padding: 20,
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
  backButton: {
  
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    marginTop:20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop:50,
    width: 230,
    height: 61,
  },
  contentContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeScanner: {
    width: 200,
    height: 200,
  },
  scanText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    color: 
    "#fff",
  },
});

export default ScanQrCode;


