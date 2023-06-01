import React from "react";
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
const Homepage = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/background_homepage.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_litle_hompeage.png")}
        />
        <Text  style={styles.tagline}>empowering new ideas</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonHome}
        onPress={() => navigation.navigate('Eventlist')}>
          <View style={styles.buttonContent}>
            <Image source={require('../assets/list_icon.png')} style={styles.icon1} />
            <Text style={styles.buttonText}>My Event List</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonHome}
          onPress={() => navigation.navigate('ScanQrCode')}
        >
          <View style={styles.buttonContent}>
            <Image source={require('../assets/icon_scan.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Join new event</Text>
          </View>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    top: "10%",
    marginLeft:20,
  },
  logo: {
    width: 232,
    height: 61,
  },
  tagline:{
    marginTop:10,
    color:"#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  buttonHome: {
    marginHorizontal: 10,
    shadowColor: "#000",
    width:150,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    opacity:0.9,
    height:170,
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: '#3F3E78',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },  
  icon1: {
    width: 86,
    height: 71,
    marginBottom: 10,
  },
  buttonText: {
    marginTop:20,
    fontSize: 16,
    fontWeight: "bold",
    color:"#fff",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 12,
  },
});

export default Homepage;