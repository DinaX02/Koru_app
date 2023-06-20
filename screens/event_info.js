import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,ScrollView,
} from "react-native";

const Eventinfo = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [eventStatus, setEventStatus] = useState('');


  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };



  // fetch('https://labmm.clients.ua.pt/proj/koru/event/info/1')
  // .then(response => response.json())
  // .then(data => {
  //   const eventInfo=data;
  //   // Faça algo com os dados recebidos
  //   console.log(data);
  // })
  // .catch(error => {
  //   // Trate erros aqui
  //   console.error(error);
  // });

 const eventInfo = {
  "info": [
      {
          "name_event": "MediaPlay23",
          "des_event": "Media Play is an event organized by DeCA, where the students present the best projects developed in the DeCA's Communication Sciences and Technologies courses, covering all study cycles.All the projects were selected by a jury, based on the proposals presented by the students.",
          "logo_event": "", //img event
          "start_date": "2023-06-27 09:00:00",
          "end_date": "2023-06-27 19:00:00",
          "vote_start": "2002-02-02 12:00:00", //caso for null fzr algo
          "vote_end": "2002-02-02 18:30:00", //caso for null fzr algo
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
  const currentDateTime = new Date().getTime();
  const startDate = new Date(eventInfo.info[0].start_date).getTime();
  const endDate = new Date(eventInfo.info[0].end_date).getTime();

  if (currentDateTime < startDate) {
    setEventStatus('Upcoming');
  } else if (currentDateTime >= startDate && currentDateTime <= endDate) {
    setEventStatus('Ongoing');
  } else {
    setEventStatus('Closed');
  }
}, []);

 let imageSourceStatusEvent;
  if (eventStatus === 'Upcoming') {
    imageSourceStatusEvent = require("../assets/upcoming_yellow.png");
  } else if (eventStatus === 'Closed') {
    imageSourceStatusEvent = require("../assets/Closed_red.png");
  } else {
    imageSourceStatusEvent = require("../assets/ongoing_green.png");
  }

// receber apenas o mes

const startDateMonth = new Date(eventInfo.info[0].start_date);
const monthName = startDateMonth.toLocaleString('default', { month: 'short' }).toUpperCase().replace('.', '');

// receber apenas dia do mes

const startDateDay = new Date(eventInfo.info[0].start_date);
const dayOfMonth = startDateDay.getDate();

// hora e data evento
const startDateTime = eventInfo.info[0].start_date;
const endDateTime = eventInfo.info[0].end_date;

const startTime = startDateTime.split(' ')[1].slice(0, -3); // para receber so hora e minutos
const endTime = endDateTime.split(' ')[1].slice(0, -3); // para receber so hora e minutos

// hora e data votacao

const startVotingTime = eventInfo.info[0].vote_start;
const endVotingTime = eventInfo.info[0].vote_end;

const startVoting = startVotingTime.split(' ')[1].slice(0, -3); // para receber so hora e minutos
const endVoting = endVotingTime.split(' ')[1].slice(0, -3); // para receber so hora e minutos

  return (
   
    <View style={styles.container}>

{/* info do evento em baixo */}

    <View style={styles.contentContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateDay}>{dayOfMonth}</Text>
        <Text style={styles.dateMonth}>{monthName}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.eventDetailsContainer}>
        <View style={styles.eventTitleContainer}>
          <Text style={styles.eventTitleText}>{eventInfo.info[0].name_event}</Text>
          <Text style={styles.organizedByText}>Organized by<Text style={styles.organizerName}> {eventInfo.info[0].name_org} </Text></Text>
         
          <Text style={styles.eventHours}>{startTime} - {endTime}</Text>
        </View>

        <View style={styles.ongoingContainer}>
          <Text style={styles.ongoingText}>{eventStatus}</Text>
          <Image
            source={imageSourceStatusEvent}
            style={styles.ongoingImage}
          />
        </View>
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
  {eventInfo.info[0].des_event}
  </Text>
</View>
  {/* voting info*/}
<View style={styles.votingContainer}>
  <Text style={styles.votingTitle}>Voting</Text>
  <View style={styles.votingContent}>
    <View style={styles.votingItem}>
      <Text style={styles.votingItemTitle}>Start:</Text>
      <Text style={styles.votingItemValue}>{startVoting}</Text>
    </View>
    <View style={styles.votingItem}>
      <Text style={styles.votingItemTitle}>Closes at:</Text>
      <Text style={styles.votingItemValue}>{endVoting}</Text>
    </View>
  </View>
</View>
 {/* other info*/}
<View style={styles.totalContainer}>
  <View style={styles.totalItem}>
    <Text style={styles.totalTitle}>Total projects</Text>
    <Text style={styles.totalValue}>{eventInfo.info[0].total_projetos}</Text>
  </View>
  <View style={styles.totalItem}>
    <Text style={styles.totalTitle}>Total participants</Text>
    <Text style={styles.totalValue}>{eventInfo.info[0].total_people}</Text>
  </View>
</View>
<View style={styles.COinsss}>
  <Text style={styles.totalTitle}>Types of Coins</Text>
  {eventInfo.coins.map((coin) => (
    <Text style={styles.totalValue} key={coin.id_coin}>{coin.name_coin}</Text>
  ))}
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


