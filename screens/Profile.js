import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";


const Profile = () => {


  return (
    <ImageBackground
      source={require("../assets/img_background_login.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/logo_litle_hompeage.png")}
          />
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.paragraph}>Hi Koru_admin !</Text>
        </View>

        <View style={styles.overlay}>
         <Text style={styles.titleOVerlayBlue}>Number of events:</Text>
         <Text style={styles.paragraph_inputs_overlay}>3</Text>
         <Text style={styles.titleOVerlayBlue}>Coins Invested:</Text>
         <Text style={styles.paragraph_inputs_overlay}>385</Text>
         <Text style={styles.titleOVerlayBlue}>Email:</Text>
         <Text style={styles.paragraph_inputs_overlay}>koru@email.com</Text>
         <Text style={styles.titleOVerlayBlue}>Recent Transactions History:</Text>
         <View style={styles.overlayTransaction}>

         </View>

         <View style={styles.linksContainer}>
         <Text style={styles.titleOVerlayBlueLinks}>Change Password</Text>
         <Text style={styles.titleOVerlayBlueLinks}>Delete Account</Text>
         </View>

         <View style={styles.logout_btn}>
        <Image
            style={styles.log_out}
            source={require("../assets/log_out.png")}
          />
        </View>

        </View>

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
  log_out:{
width:30,
height:30,
  },
  paragraph: {
    fontSize: 14,
    color:"white",
  }, 
  logout_btn:{
    marginTop:40,
    marginBottom:-20,
    flex:1,
    justifyContent:"flex-end",
alignItems:"flex-end",
alignSelf:"flex-end",
  },
   paragraph_inputs_overlay: {
    fontSize: 14,
    color:"#001847",
    fontWeight:"normal",
    marginTop:10,
    marginBottom:10,
    textAlign: "left",
  },
  logoContainer: {
    position: "absolute",
    top: "7%",
    left: 0,
    right: 0,
    alignItems: "flex-start",
    paddingTop: 20,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'center',
  },
  logo: {
    width: 88,
    height: 23,
  },
  overlay: {
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    textAlign:"left",
    alignItems: "flex-start",
  },
  overlayTransaction: {
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign:"left",
  },
  alignoverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "left",
  },
  titleOVerlayBlue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001847",
    textAlign: "left",
  },
  titleOVerlayBlueLinks: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001847",
    textDecorationLine:"underline",
    marginTop: 20,
    marginRight: 10,
  },
  logintext: {
    textAlign: "left",
  },
  input: {
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "90%",
  },
  button: {
    backgroundColor: "#625EFD",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "90%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;


