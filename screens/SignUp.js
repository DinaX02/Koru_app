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
import { LinearGradient } from "expo-linear-gradient";

const SignUp = () => {

  const [email, setEmail] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };



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
         <Text style={styles.title}>Sign Up</Text>
      </View>
     

      <View style={styles.overlay}>
      <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
  logoContainer: {
    position: 'absolute',
    top: "7%",
    left: 0,
    right: 0,
    alignItems: "flex-start",
    paddingTop: 20,
    marginLeft:20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 86,
    height: 23,
  },
  overlay: {
    backgroundColor: 'rgba(217, 217, 217, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
    marginTop:120,
    marginBottom: 20,
    textAlign: 'left',
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

export default SignUp;

{
  /* 

<LinearGradient 
style={{
height: height, 
width: width, 
paddingBottom:1000, 
borderRadius: 5,
backgroundImage: 'url(./assets/img_background_login.png))',
}}

colors={['#807DFF','#4E4D8D']}>


<Text>Welcome</Text>
</LinearGradient>*/
}
