import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,ScrollView, 
} from "react-native";

import FooterMenu from "../components/MenuFooter";

const Eventinfo = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [selectedStatus, setSelectedStatus] = useState("Closed");
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

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

  return (
   
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.eventTitle}>Titulo do Evento</Text>
      <Image
        source={require("../assets/event_img_test.png")}
        style={styles.eventImage}
      />
    </View>

    <View style={styles.navigation}>
      <TouchableOpacity
        style={[
          styles.navButton,
          selectedTab === "about" && styles.selectedNavButton,
        ]}
        onPress={() => handleTabPress("about")}
      >
        <Text
          style={[
            styles.navButtonText,
            selectedTab === "about" && styles.selectedNavButtonText,
          ]}
        >
          About
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navButton,
          selectedTab === "voting" && styles.selectedNavButton,
        ]}
        onPress={() => handleTabPress("voting")}
      >
        <Text
          style={[
            styles.navButtonText,
            selectedTab === "voting" && styles.selectedNavButtonText,
          ]}
        >
          Voting
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navButton,
          selectedTab === "liveRanking" && styles.selectedNavButton,
        ]}
        onPress={() => handleTabPress("liveRanking")}
      >
        <Text
          style={[
            styles.navButtonText,
            selectedTab === "liveRanking" && styles.selectedNavButtonText,
          ]}
        >
          Live Ranking
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navButton,
          selectedTab === "schedule" && styles.selectedNavButton,
        ]}
        onPress={() => handleTabPress("schedule")}
      >
        <Text
          style={[
            styles.navButtonText,
            selectedTab === "schedule" && styles.selectedNavButtonText,
          ]}
        >
          Schedule
        </Text>
      </TouchableOpacity>
    </View>
{/* info do evento em baixo */}
    <View style={styles.contentContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateDay}>27</Text>
        <Text style={styles.dateMonth}>JUNE</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.eventDetailsContainer}>
        <View style={styles.eventTitleContainer}>
          <Text style={styles.eventTitleText}>Titulo do Evento</Text>
          <Text style={styles.organizedByText}>Organized by<Text style={styles.organizerName}> DeCa</Text></Text>
         
          <Text style={styles.eventHours}>9:00 - 19:00</Text>
        </View>

        <View style={styles.ongoingContainer}>
          <Text style={styles.ongoingText}>{selectedStatus}</Text>
          <Image
            source={getImageSource()}
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
    Media Play is an event organized by DeCA, where the students present the best projects developed in the DeCA's Communication Sciences and Technologies courses, covering all study cycles.
    {"\n\n"}
    All the projects were selected by a jury, based on the proposals presented by the students.
  </Text>
</View>
  {/* voting info*/}
<View style={styles.votingContainer}>
  <Text style={styles.votingTitle}>Voting</Text>
  <View style={styles.votingContent}>
    <View style={styles.votingItem}>
      <Text style={styles.votingItemTitle}>Start:</Text>
      <Text style={styles.votingItemValue}>12:00</Text>
    </View>
    <View style={styles.votingItem}>
      <Text style={styles.votingItemTitle}>Closes at:</Text>
      <Text style={styles.votingItemValue}>18:30</Text>
    </View>
  </View>
</View>
 {/* other info*/}
<View style={styles.totalContainer}>
  <View style={styles.totalItem}>
    <Text style={styles.totalTitle}>Total projects</Text>
    <Text style={styles.totalValue}>16</Text>
  </View>
  <View style={styles.totalItem}>
    <Text style={styles.totalTitle}>Total participants</Text>
    <Text style={styles.totalValue}>200</Text>
  </View>
</View>
<View style={styles.COinsss}>
    <Text style={styles.totalTitle}>Types of Coins</Text>
    <Text style={styles.totalValue}>Public</Text>
    <Text style={styles.totalValue}>Directors</Text>
    <Text style={styles.totalValue}>Companies</Text>
  </View>
</View>
</ScrollView>
<FooterMenu/>
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
    color: "#2F2E5F",
  },
  totalValue: {
    fontSize: 14,
    color: "#fff",
  },
  votingContainer: {
    marginTop: 20,
  },
  votingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2F2E5F",
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
    color: "#fff",
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
    color: "#2F2E5F",
  },
  overviewText: {
    fontSize: 14,
    color: "#fff",
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
    borderTopColor: "#AEAEAE",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dateContainer: {
    flexDirection: "column",
    marginRight: 15,
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


