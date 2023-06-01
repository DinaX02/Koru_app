import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,

} from "react-native";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  return (
    <ImageBackground
      source={require("../assets/background_homepage.png")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/logo_litle_hompeage.png")}
          />
       
        </View>

        <KeyboardAvoidingView style={styles.overlay}>
          <View style={styles.TextnamePage}>
        <Text style={styles.title}>Sign Up</Text></View>
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
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Homepage')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>


        </KeyboardAvoidingView>


      </View>
      <TouchableOpacity style={styles.setacontainer}
      onPress={() => navigation.goBack()} // Função para voltar para a página anterior
      >
        <Image
          style={styles.seta}
          source={require("../assets/seta_back.png")}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  setacontainer: {
    marginBottom: 50,
    alignItems: "center",
  },
  seta: {
    marginTop:40,
    width: 30,
    height: 30,
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
  logo: {
    width: 86,
    height: 23,
  },
  overlay: {
    backgroundColor: "rgba(217, 217, 217, 0.6)",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  TextnamePage:{
  justifyContent: "flex-start",
  alignItems: "flex-start",
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
    marginBottom: 20,
    textAlign: "left",
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
    textAlign:"center",
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
