import React, {useState, useEffect, useContext} from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';


const JoinEventAfterScan = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { tokenInfo, tokens } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      const fetchPromises = tokens.map(async (token) => {
        const response = await axios.post(
            `${BASE_URL}/qr/secondread`,
            {
              token: token.value,
            },
            {
              headers: {
                Authorization: userInfo.token,
                id: userInfo.id_user,
              },
            }
        );
        return response.data;
      });

      const results = await Promise.all(fetchPromises);
      console.log(results);

      // Navigate to the event list page
      navigation.navigate('Eventlist');
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <ImageBackground
          source={require("../assets/background.png")}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
      >
        <View>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.goBack()}>
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
                  source={{ uri: `data:image/png;base64,${tokenInfo[0].logo_event}` }}
              />
            </View>
          </View>

          <Text style={styles.eventName}>{tokenInfo[0].name_event}</Text>

          <Text style={styles.eventDescription}>
            Join {tokenInfo[0].name_event} with {tokenInfo.map((info, index) => {
            if (index === tokenInfo.length - 1 && tokenInfo.length > 1) {
              return `and ${info.amount} ${info.name_coin} coins`;
            } else if (tokenInfo.length > 2) {
              return `${info.amount} ${info.name_coin} coins, `;
            }
            else {
              return `${info.amount} ${info.name_coin} coins `;
            }
          })}?
          </Text>

          <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text style={styles.joinButtonText}>Join</Text>
            )}
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
    borderRadius: 45,
    marginBottom: 10,
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
