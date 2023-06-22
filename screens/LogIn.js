import React, { useState, useContext } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Alert,ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";

const LogIn = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

    const {login} = useContext(AuthContext);

  const handleLogin = () => {
    login(username, password)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(error => {
          setErrorMessage(true)
        });
  };


  return (
    <ScrollView
    contentContainerStyle={styles.scrollContainer}
    keyboardShouldPersistTaps="handled"
  >
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
      </View>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.overlay}>
        <View>
              <Text style={styles.title}>Login</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={text => {
                  setUsername(text);
                  setErrorMessage(false);
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setErrorMessage(false);
                }}
            />
            <Text style={{
              display: errorMessage ? "flex" : "none",
              color: "#D10000",
            }}>Wrong password or username</Text>

            <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
                style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.setacontainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Função para voltar para a página anterior
        >
          <Image style={styles.seta} source={require("../assets/seta_back.png")} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setacontainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  seta: {
    marginBottom: 20,
    width: 30,
    height: 30,
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
    marginTop: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
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

export default LogIn;

