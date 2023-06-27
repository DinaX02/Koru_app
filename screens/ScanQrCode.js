import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import QrCodeReader from "../components/QrCodeReader";

import { useNavigation } from '@react-navigation/native';

const ScanQrCode = () => {


  const navigation = useNavigation();


  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
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
        <Text style={styles.scanText}>Scan the QR code</Text>

        
      </View>


    <QrCodeReader/>
    

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoutBtn: {
    top:20,
    left: 20,
  },
  logOut: {
    marginTop:30,
    width: 30,
    height: 30,
  },
  logoContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop:50,
    width: 230,
    height: 61,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scanText: {
    marginBottom:80,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    color: 
    "#fff",
  },
});

export default ScanQrCode;


