import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,ScrollView,
} from "react-native";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../config";

const Eventinfo = () => {

  const [selectedStatus, setSelectedStatus] = useState("Upcoming");
  const [eventInfo, setEventInfo] = useState({});
  const {userInfo} = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const {eventId} = useContext(AuthContext);

  const getImageSource = () => {
    if (selectedStatus === "Ongoing") {
      return require("../assets/ongoing_green.png");
    } else if (selectedStatus === "Closed") {
      return require("../assets/Closed_red.png");
    } else if (selectedStatus === "Upcoming") {
      return require("../assets/upcoming_yellow.png");
    }

    return require("../assets/ongoing_green.png"); // Imagem padrão caso não haja correspondência
  };

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
    console.log(eventInfo);
  }, [eventInfo]);

  useEffect(() => {
    if (eventInfo.info && eventInfo.info.length > 0) {
      const startDate = new Date(eventInfo.info[0].start_date);
      const endDate = new Date(eventInfo.info[0].end_date);
      const currentDate = new Date();

      if (currentDate >= startDate && currentDate <= endDate) {
        setSelectedStatus("Ongoing");
      } else if (currentDate > endDate) {
        setSelectedStatus("Closed");
      } else if (currentDate < startDate) {
        setSelectedStatus("Upcoming");
      }
    } else {
      setSelectedStatus("Open");
    }
  }, [eventInfo]);

  return (

      <View style={styles.container}>

        {/* info do evento em baixo */}
        <View style={styles.contentContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateDay}>{eventInfo.info ? new Date(eventInfo.info[0].start_date).getDate() : "Day"}</Text>
            <Text style={styles.dateMonth}>{eventInfo.info ? new Date(eventInfo.info[0].start_date).toLocaleString('default', { month: 'short' }).toUpperCase().replace('.', '') : "Month"}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventTitleContainer}>
              <Text style={styles.eventTitleText}>{eventInfo.info ? eventInfo.info[0].name_event : "Event"}</Text>
              <Text style={styles.organizedByText}>Organized by<Text style={styles.organizerName}> {eventInfo.info ? eventInfo.info[0].name_org : "Koru"}</Text></Text>

              <Text style={styles.eventHours}>{eventInfo.info ? eventInfo.info[0].start_date.split(' ')[1].slice(0, -3) : "start"} - {eventInfo.info ? eventInfo.info[0].end_date.split(' ')[1].slice(0, -3) : "end"}</Text>
            </View>

            {selectedStatus && (
                <View style={styles.ongoingContainer}>
                  <Text style={styles.ongoingText}>{selectedStatus}</Text>
                  <Image
                      source={getImageSource()}
                      style={styles.ongoingImage}
                  />
                </View>
            )}
          </View>
        </View>

        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.backgroundImage}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.content}>
              {/* Conteúdo aqui */}
              <View>
                <Text style={styles.overviewTitle}>Overview</Text>
                <Text style={styles.overviewText}>
                  {eventInfo.info ? eventInfo.info[0].des_event : "Description..."}
                </Text>
              </View>
              {/* voting info*/}
              <View style={styles.votingContainer}>
                <Text style={styles.votingTitle}>Voting</Text>
                <View style={styles.votingContent}>
                  <View style={styles.votingItem}>
                    <Text style={styles.votingItemTitle}>Start:</Text>
                    <Text style={styles.votingItemValue}>{eventInfo.info ? eventInfo.info[0].vote_start.split(' ')[1].slice(0, -3) : "start"}</Text>
                  </View>
                  <View style={styles.votingItem}>
                    <Text style={styles.votingItemTitle}>Closes at:</Text>
                    <Text style={styles.votingItemValue}>{eventInfo.info ? eventInfo.info[0].vote_end.split(' ')[1].slice(0, -3) : "end"}</Text>
                  </View>
                </View>
              </View>
              {/* other info*/}
              <View style={styles.totalContainer}>
                <View style={styles.totalItem}>
                  <Text style={styles.totalTitle}>Total projects</Text>
                  <Text style={styles.totalValue}>{eventInfo.info ? eventInfo.info[0].total_projetos : "0"}</Text>
                </View>
                <View style={styles.totalItem}>
                  <Text style={styles.totalTitle}>Total participants</Text>
                  <Text style={styles.totalValue}>{eventInfo.info ? eventInfo.info[0].total_people : "0"}</Text>
                </View>
              </View>
              <View style={styles.COinsss}>
                <Text style={styles.totalTitle}>Types of Coins</Text>
                {eventInfo.coins && (
                    eventInfo.coins.map((coin, index) => (
                          <Text key={index} style={styles.totalValue}>
                            {coin.name_coin}
                          </Text>
                      ))
                )}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>

  );
};

const styles = StyleSheet.create({
  totalContainer: {
    marginTop: 20,
  },
  COinsss:{
    marginTop:10,
    paddingBottom:80,
  },
  totalItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  totalValue: {
    fontSize: 14,
    color: "#E9E7E7",
    marginBottom:5,
  },
  votingContainer: {
    marginTop: 20,
  },
  votingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  votingContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  votingItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  votingItemTitle: {
    marginRight: 5,
    fontSize: 14,
    color: "white",
    fontWeight : "bold",
  },
  votingItemValue: {
    fontSize: 14,
    color: "#E9E7E7",
    fontWeight : "normal",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  overviewText: {
    fontSize: 14,
    color: "#E9E7E7",
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
  navigation: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingTop:5,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  navButtonText: {
    fontSize: 14,
    color: "#2F2E5F",
  },
  selectedNavButton: {
    borderBottomWidth: 5,
    borderBottomColor: "#2F2E5F",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedNavButtonText: {
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dateContainer: {
    flexDirection: "column",
    marginRight: 8,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",

  },
  dateDay: {
    fontSize: 16,
    fontWeight: "bold",
    color:"#2F2E5F",
  },
  dateMonth: {
    fontSize: 16,
    fontWeight: "bold",
    color:"#2F2E5F",
  },
  separator: {
    height: "95%",
    width: 2.5,
    backgroundColor: "#AEAEAEAE",
    marginHorizontal: 15,
    borderRadius:20,
  },
  eventDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  eventTitleText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color:"#2F2E5F",
  },
  organizedByText: {
    color:"#AEAEAE",
    fontSize: 12,
  },
  organizerName: {
    fontWeight: "bold",
    marginBottom: 5,
    color:"#2F2E5F",
  },
  eventHours: {
    marginTop:10,
    fontSize: 12,
    color:"#2F2E5F"
  },
  ongoingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ongoingText: {
    fontSize:14,
    fontWeight:"bold",
    marginRight: 5,
  },
  ongoingImage: {
    width: 10,
    height: 10,
  },
});

export default Eventinfo;