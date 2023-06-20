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
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LogIn = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // Create form data
            const formData = new URLSearchParams();
            formData.append("password", password);

            // Perform the login API request using the provided endpoint and data
            const response = await fetch(
                `https://labmm.clients.ua.pt/proj/koru/user/login/${username}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: formData.toString(), // Convert form data to string
                }
            );

            // Check if the login was successful
            if (response.ok) {
                const data = await response.json();
                const { id_user, token } = data;

                // TODO: Handle the successful login, e.g., store the user token in the app's state or AsyncStorage
                // and navigate to the next screen
                Alert.alert(token)
            } else {
                // Handle login error
                Alert.alert("Login Failed", "Invalid username or password");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            // Handle login error
            Alert.alert("Login Failed", "An error occurred during the login process");
        }
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
              <Text style={styles.title}>Log In</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
            style={styles.setacontainer}
            onPress={() => navigation.goBack()} // Função para voltar para a página anterior
        >
          <Image style={styles.seta} source={require("../assets/seta_back.png")} />
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
  },  setacontainer: {
    marginBottom: 50,
    alignItems: "center",
  },
  seta: {
    marginTop:20,
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

