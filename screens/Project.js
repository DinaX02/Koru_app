import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import PopUp from "../components/PopUp";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";

const Project = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [eventWallet, setEventWallet] = useState({});
  const { userInfo } = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const { eventId } = useContext(AuthContext);
  const route = useRoute();
  const {
    projectName,
    projectDescription,
    projectLogo,
    projectId,
    status,
  } = route.params;

  useEffect(() => {
    axios
        .get(`${BASE_URL}/event/balance/${eventId}`, {
          headers: {
            Authorization: token,
            id: id_user,
          },
        })
        .then((res) => {
          setEventWallet(res.data);
        })
        .catch((e) => {
          console.log("error", e);
        });
  }, []);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    axios
        .get(`${BASE_URL}/event/balance/${eventId}`, {
          headers: {
            Authorization: token,
            id: id_user,
          },
        })
        .then((res) => {
          setEventWallet(res.data);
        })
        .catch((e) => {
          console.log("error", e);
        });
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewsContainer}>
          {eventWallet && Object.keys(eventWallet).length > 0 ? (
              Object.keys(eventWallet).map((key, index) => {
                const coin = eventWallet[key];
                let coinImage;

                if (index === 0) {
                  coinImage = require(`../assets/coin.png`);
                } else if (index === 1) {
                  coinImage = require(`../assets/coin_red.png`);
                } else if (index === 2) {
                  coinImage = require(`../assets/coin_yellow.png`);
                }

                return (
                    <View style={styles.view} key={index}>
                      <Image source={coinImage} style={styles.img_coins_vote} />
                      <Text style={styles.viewText}>{coin.balance}</Text>
                    </View>
                );
              })
          ) : (
              <Text style={{ color: "white" }}>No coins available</Text>
          )}
        </View>

        <View style={styles.imageContainer}>
          <Image
              source={{ uri: `data:image/png;base64,${projectLogo}` }}
              style={styles.image}
          />
          <Text style={styles.title}>{projectName}</Text>
        </View>

        <Text style={styles.sliderdescription}>{projectDescription}</Text>

        <View style={styles.voteView}>
          {status === "Open" ? (
              <TouchableOpacity style={styles.voteButton} onPress={openPopup}>
                <Text style={styles.voteButtonText}>Vote</Text>
              </TouchableOpacity>
          ) : (
              <>
                <TouchableOpacity
                    style={[styles.voteButton, styles.disabledVoteButton]}
                    disabled={true}
                >
                  <Text style={styles.voteButtonText}>Vote</Text>
                </TouchableOpacity>
                <Text style={styles.disabledMessage}>
                  Voting is currently closed, wait for it to open to be able to
                  vote.
                </Text>
              </>
          )}
        </View>

        <PopUp
            visible={popupVisible}
            onClose={closePopup}
            nameProject={projectName}
            idProject={projectId}
        />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  voteView:{
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  img_coins_vote: {
    marginRight: 5,
    width: 15,
    height: 15,
  },
  coindiv: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  sliderdescription: {
    width: "80%",
    textAlign: "center",
  },
  imageContainer: {
    marginTop: 60,
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    borderWidth: 2,
    borderColor: "#2F2E5F",
    width: 100,
    height: 100,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  descriptionContainer: { width: "100%" },
  description: {
    width: "100%",
    textAlign: "center",
    marginTop: 10,
  },
  voteButton: {
    backgroundColor: "#2F2E5F",
    padding: 10,
    borderRadius: 20,
    width: 150,
    marginTop: 30,
    marginBottom: 10,
  },
  disabledVoteButton: {
    backgroundColor: "#888",
  },
  voteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
  viewsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#2F2E5F",
  },
  view: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewImage: {
    width: 50,
    height: 50,
  },
  viewText: {},
});

export default Project;
