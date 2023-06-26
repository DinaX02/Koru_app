import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import PopUp from "../components/PopUp";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";

const Project = () => {
  // const [popupVisible, setPopupVisible] = useState(false);
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState("Project");
  const [projectDescription, setProjectDescription] = useState("Description...");
  const [popupVisible, setPopupVisible] = useState(false);
  const [eventProjects, setEventProjects] = useState({});
  const [eventWallet, setEventWallet] = useState({});
  const { userInfo } = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const { eventId } = useContext(AuthContext);



  /*useEffect(() => {
    console.log(eventProjects);
  }, [eventProjects]);*/


  useEffect(() => {
    console.log(eventWallet);
  }, [eventWallet]);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const coinsData = {
    teste_coin1: {
      id: 1,
      balance: 100,
    },
    teste_coin2: {
      id: 2,
      balance: 50,
    },
    teste_coin3: {
      id: 2,
      balance: 10,
    },
  };

  
  const renderCoins = () => {
    return Object.values(coinsData).map((coin, index) => {
      let coinImage;

      if (index === 0) {
        coinImage = require('../assets/coin.png');
      } else if (index === 1) {
        coinImage = require('../assets/coin_red.png');
      } else if (index === 2) {
        coinImage = require('../assets/coin_yellow.png');
      }

      return (
        <View style={styles.view} key={index}>
          <Image
            source={coinImage}
            style={styles.img_coins_vote}
          />
          <Text style={styles.viewText}>{coin.balance}</Text>
        </View>
      );
    });
  };

  return (
   
      
       <ScrollView contentContainerStyle={styles.container}>

<View style={styles.viewsContainer}>
      {renderCoins()}
    </View>
    
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/image_welcome.png")}
            style={styles.image}
          />
          <Text style={styles.title}>{projectName}</Text>
        </View>

        <Text style={styles.sliderdescription}>dsdsadasdsadasdaddadaddadasdasdadadsadsadadsadadadsdsssddsdadadaddsdsadasdsadasdaddadaddadasdasdadadsadsadadsadadadsdsssddsdadadaddsdsadasdsadasdaddadaddadasdasdadadsadsadadsadadadsdsssddsdadadaddsdsadasdsadasdaddadaddadasdasdas</Text>

        <View style={styles.voteView}>
          <TouchableOpacity style={styles.voteButton} onPress={openPopup}>
            <Text style={styles.voteButtonText}>Vote</Text>
          </TouchableOpacity>
        </View>

        <PopUp visible={popupVisible} onClose={closePopup} />

 </ScrollView>

   
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor:"white",
    flex: 1,
    alignItems: "center",
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },  img_coins_vote: {
    marginRight: 5,
    width:15,
    height:15
  },
  LinkVote: {
    width: "80%",
    marginTop: 5,
  },
  Linkbold: {
    color: "#2F2E5F",
    fontWeight: "bold",
  },
  coindiv: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  sliderdescription: {
    width: "80%",
  },
  walletContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
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
    marginBottom: 30,
  },
  voteView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  voteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  view: {
    flexDirection:"row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#2F2E5F",
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    justifyContent:"center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewImage: {
    width: 50,
    height: 50,
  },
  viewText: {
  },
});

export default Project;