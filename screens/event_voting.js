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
  const [eventInfo, setEventInfo] = useState({});
  const {userInfo} = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const {eventId} = useContext(AuthContext);

  useEffect(() => {
    axios
        .get(
            `${BASE_URL}/event/info/${eventId}`,
            {
              headers: {
                Authorization: token,
                id: id_user,
              },
            },
        )
        .then(res => {
          setEventInfo(res.data);
        })
        .catch(e => {
          console.log("error", e);
        });
  }, []);

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



  useEffect(() => {
    if (eventInfo && eventInfo.info && eventInfo.info.length > 0) {
      const currentDateTime = new Date().getTime(); // current time
      const voteStartDateTime = eventInfo.info[0].vote_start
          ? new Date(eventInfo.info[0].vote_start).getTime()
          : null; // voting start time
      const voteEndDateTime = eventInfo.info[0].vote_end
          ? new Date(eventInfo.info[0].vote_end).getTime()
          : null; // voting end time

      if (voteStartDateTime && voteEndDateTime && currentDateTime >= voteStartDateTime && currentDateTime <= voteEndDateTime) {
        setStatus('Open');
        setImageSource(require("../assets/ongoing_green.png"));
      } else {
        setStatus('Closed');
        setImageSource(require("../assets/Closed_red.png"));
      }
    }
  }, [eventInfo]);



  const panelRef = useRef(null);
  const dimensions = useWindowDimensions();


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

          {status === 'Open' && (
              <Text style={styles.statustexttags}>
                <Text style={styles.statusgrey}>Closes at:</Text>{' '}
                {eventInfo.info ? eventInfo.info[0].vote_end.split(' ')[1].slice(0, -3) : 'date'}
              </Text>
          )}
        </View>
        <View style={styles.wallet}>
  <View>
    <Text style={styles.wallettitle}>Your Wallet</Text>
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
              <View key={index} style={styles.coindiv}>
                <Image style={styles.coin_img_size} source={coinImage} />
                <Text style={styles.cointitle}>{key}</Text>
                <Text style={styles.coinvalue}>{coin.balance}</Text>
              </View>
          );
        })
    ) : (
        <Text style={{color:"white"}}>No coins available</Text>
    )}
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
              <Text style={{color:"white"}}>No projects available for voting at the moment</Text>
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
  },
    joinButtonText: {
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
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
    borderColor: "#2F2E5F",
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
