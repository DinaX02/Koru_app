import React, { useState, useRef , useEffect, useContext} from "react";
import BottomSheet from 'react-native-simple-bottom-sheet';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import PopUp from "../components/PopUp";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../config";
import {useNavigation} from "@react-navigation/native";



const Eventvoting = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('Open');
  const [imageSource, setImageSource] = useState(require("../assets/ongoing_green.png"));
  const [projectName, setProjectName] = useState("Project");
  const [projectDescription, setProjectDescription] = useState("Description...");
  const [popupVisible, setPopupVisible] = useState(false);
  const [eventProjects, setEventProjects] = useState({});
  const [eventWallet, setEventWallet] = useState({});
  const {userInfo} = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const {eventId} = useContext(AuthContext);

  useEffect(() => {
    axios
        .get(
            `${BASE_URL}/event/projects/${eventId}`,
            {
              headers: {
                Authorization: token,
                id: id_user,
              },
            },
        )
        .then(res => {
          setEventProjects(res.data);
        })
        .catch(e => {
          console.log("error", e);
        });
  }, []);

  /*useEffect(() => {
    console.log(eventProjects);
  }, [eventProjects]);*/

  useEffect(() => {
    axios
        .get(
            `${BASE_URL}/event/balance/${eventId}`,
            {
              headers: {
                Authorization: token,
                id: id_user,
              },
            },
        )
        .then(res => {
          setEventWallet(res.data);
        })
        .catch(e => {
          console.log("error", e);
        });
  }, []);

  useEffect(() => {
    console.log(eventWallet);
  }, [eventWallet]);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const eventInfo = {
    "info": [
        {
            "name_event": "MediaPlay23",
            "des_event": "Media Play is an event organized by DeCA, where the students present the best projects developed in the DeCA's Communication Sciences and Technologies courses, covering all study cycles.All the projects were selected by a jury, based on the proposals presented by the students.",
            "logo_event": "", //img event
            "start_date": "2023-06-27 09:00:00",
            "end_date": "2023-06-27 19:00:00",
            "vote_start": "2023-06-15 12:00:00", //caso for null fzr algo
            "vote_end": "2023-06-27 18:30:00", //caso for null fzr algo
            "name_org": "DeCA",
            "total_people": 2,
            "total_projetos": 3
        }
    ],
    "coins": [
        {
            "id_coin": 1,
            "name_coin": "coin1"
        },
        {
            "id_coin": 3,
            "name_coin": "coin2"
        }
    ]
  }


  useEffect(() => {
    const currentDateTime = new Date().getTime(); // hora atual
    const voteStartDateTime = new Date(eventInfo.info[0].vote_start).getTime(); // hora inicio votacao
    const voteEndDateTime = new Date(eventInfo.info[0].vote_end).getTime(); // hora fim votacao

    if (currentDateTime >= voteStartDateTime && currentDateTime <= voteEndDateTime) {
      setStatus('Open');
      setImageSource(require("../assets/ongoing_green.png"));
    } else {
      setStatus('Closed');
      setImageSource(require("../assets/Closed_red.png"));
    }
  }, []);


  const walletData = {
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


  const panelRef = useRef(null);
  const dimensions = useWindowDimensions();

  const endVotingTime = eventInfo.info[0].vote_end;

  const endVoting = endVotingTime.split(' ')[1].slice(0, -3); // para receber so hora e minutos do fim da votacao

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        {/* status */}
        <View style={styles.status}>
        <View style={styles.statustext}>
      <Text style={styles.statustexttags}>
        <Text style={styles.statusgrey}>Status:</Text> {status}
      </Text>
      <Image
        source={imageSource}
        style={styles.ongoingImage}
      />
    </View>

          <Text style={styles.statustexttags}>
            <Text style={styles.statusgrey}>Closes at:</Text> {endVoting}
          </Text>
        </View>
        <View style={styles.wallet}>
  <View>
    <Text style={styles.wallettitle}>Your Wallet</Text>
    {Object.keys(walletData).map((key, index) => {
      const coin = walletData[key];
      let coinImage;

      if (index === 0) {
        coinImage = require(`../assets/coin.png`);
      } else if (index === 1) {
        coinImage = require(`../assets/coin_red.png`);
      } else if (index === 2) {
        coinImage = require(`../assets/coin_yellow.png`);
      }

      return (
        <View key={index} style={styles.coindiv}>
          <Image style={styles.coin_img_size} source={coinImage} />
          <Text style={styles.cointitle}>{key}</Text>
          <Text style={styles.coinvalue}>{coin.balance}</Text>
        </View>
      );
    })}
  </View>
  <View style={styles.walletContainer}>
    <Image source={require('../assets/wallet.png')} />
  </View>
</View>
        <ScrollView contentContainerStyle={styles.projects}>
          {eventProjects && eventProjects.length > 0 ? (
              eventProjects.map((project, index) => (
                  <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setProjectName(project.name_project)
                        setProjectDescription(project.desc_project)
                        //panelRef.current.togglePanel()
                        navigation.navigate("Vote", {
                          title: project.name_project, // Pass the title value as the parameter
                        });
                      }}
                      style={styles.project}
                  >
                    <View style={styles.projectcontent}>
                      {project.logo_project ? (
                          <Image style={styles.projectimage} source={{ uri: `data:image/png;base64,${project.logo_project}` }}/>
                      ) : (
                          <Image
                              style={styles.projectimage}
                              source={require("../assets/image_welcome.png")}
                          />
                      )}
                      <Text>{project.name_project}</Text>
                    </View>
                    <View style={styles.circle}/>

                  </TouchableOpacity>
              ))
          ) : (
              <Text>No schedule available</Text>
          )}
        </ScrollView>
      </ImageBackground>
      <BottomSheet
          isOpen={false}
          ref={ref => panelRef.current = ref}
          sliderMaxHeight={dimensions.height - 300}
      >
          <ScrollView contentContainerStyle={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 75,
          }}>
            <Image
              style={{
                borderRadius: dimensions.width / 2,
                width: dimensions.width * 0.2,
                height: dimensions.width * 0.2,
              }}
              source={require("../assets/image_welcome.png")}
            />
            <Text style={styles.slidertitle}>{projectName}</Text>
            <TouchableOpacity onPress={openPopup} style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Vote</Text>
            </TouchableOpacity>
            <Text style={styles.sliderdescription}>
              {projectDescription}
            </Text>
            <Text style={styles.LinkVote}>

            <Text style={styles.Linkbold}>Link: </Text>Koru_link.com</Text>
        <PopUp visible={popupVisible} onClose={closePopup} />
          </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  circle:{
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#2F2E5F",
    marginRight: 20,
  },
  wallet_icon:{
    width:60,
    height:60,
  },
  projectcontent:{
    flexDirection: "row",
    alignItems: "center",
  },
  coin_img_size:{
    width: 10,
    height:10,
    marginTop:3,
  },
  sliderdescription: {
    width: "95%",
  },
  slidertitle: {
    color:"#2F2E5F",
    fontSize:18,
    fontWeight:"bold",
    margin: 20,
  },  joinButton: {
    backgroundColor: "#2F2E5F",
    padding: 10,
    borderRadius: 15,
    width: 150,
    marginBottom: 20,
  },  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  LinkVote:{
    width: "90%",
    marginTop: 5,},
    Linkbold:{
      color:"#2F2E5F",
      fontWeight:"bold",
    },
  sliderline: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 2,
    position: "absolute",
    top: 20,
  },
  coinvalue:{
    color: "white",
    marginLeft: 10,
    fontWeight: 700,
  },
  cointitle: {
    marginLeft: 5,
    color: "white",
    fontSize: 12,
  },
  coindiv: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  projectimage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
    borderColor: "black",
  },
  projects: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 100,
  },
  project: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white",
    padding: 5,
    width: "90%",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  walletContainer:{
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
  },
  wallettitle: {
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
  },
  wallet: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2F2E5F",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  statusgrey: {
    color: "grey",
  },
  statustexttags: {
    marginHorizontal: 10,
    fontSize: 13,
  },
  statustext: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "#2F2E5F",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  eventTitle: {
    flex: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});

export default Eventvoting;
