import React, { useState } from "react";
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
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

import FooterMenu from "../components/MenuFooter";


const Eventvoting = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [selectedStatus, setSelectedStatus] = useState("Ongoing");
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  const SLIDERTOP = 330;

  const dimensions = useWindowDimensions();

  const top = useSharedValue(dimensions.height);

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > SLIDERTOP + 50) {
        top.value = dimensions.height;
      } else {
        top.value = SLIDERTOP;
      }
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
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
        {/* status */}
        <View style={styles.status}>
          <View style={styles.statustext}>
            <Text style={styles.statustexttags}>
              <Text style={styles.statusgrey}>Status:</Text> Open
            </Text>
            <Image
              source={require("../assets/ongoing_green.png")}
              style={styles.ongoingImage}
            />
          </View>

          <Text style={styles.statustexttags}>
            <Text style={styles.statusgrey}>Closes at:</Text> 18:30
          </Text>
        </View>
        <View style={styles.wallet}>
          <View>
            <Text style={styles.wallettitle}>Your Wallet</Text>
            <View style={styles.coindiv}>
              <Image source={require("../assets/coin.png")}></Image>
              <Text style={styles.cointitle}>Public</Text>
            </View>

            <View style={styles.coindiv}>
              <Image source={require("../assets/coin.png")}></Image>
              <Text style={styles.cointitle}>Public</Text>
            </View>

            <View style={styles.coindiv}>
              <Image source={require("../assets/coin.png")}></Image>
              <Text style={styles.cointitle}>Public</Text>
            </View>
          </View>
          <View style={styles.walletContainer}>
          <Image
            source={require("../assets/wallet.png")}
          ></Image></View>
        </View>
        <ScrollView contentContainerStyle={styles.projects}>
          <TouchableOpacity
            onPress={() => {
              top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
            }}
            style={styles.project}
          >
            <Image
              style={styles.projectimage}
              source={require("../assets/event_join.png")}
            ></Image>
            <Text>Koru</Text>
          </TouchableOpacity>
          <View style={styles.project}>
            <Image
              style={styles.projectimage}
              source={require("../assets/event_join.png")}
            ></Image>
            <Text>Zetflicks</Text>
          </View>
          <View style={styles.project}>
            <Image
              style={styles.projectimage}
              source={require("../assets/event_join.png")}
            ></Image>
            <Text>Officium</Text>
          </View>
          <View style={styles.project}>
            <Image
              style={styles.projectimage}
              source={require("../assets/event_join.png")}
            ></Image>
            <Text>Composto</Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
        >
          <View style={styles.sliderline}></View>
          <View style={styles.slidercontent}>
            <Image
              style={{
                marginTop: 10,
                borderRadius: dimensions.width / 2,
                width: dimensions.width * 0.2,
                height: dimensions.width * 0.2,
              }}
              source={require("../assets/image_welcome.png")}
            />
            <Text style={styles.slidertitle}>Koru</Text>
            <Text style={styles.sliderdescription}>
              Koru is an event tracking platform that allows organizers to
              create and manage events efficiently, while providing event
              attendees with a personalized and interactive experience. The app
              focuses on the dynamics of voting on projects displayed at the
              event, where participants have coins they can invest in the
              projects they like the most. Link: Koru_link.com
            </Text>

            <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Vote</Text>
        </TouchableOpacity>

          </View>
        </Animated.View>
      </PanGestureHandler>
      <FooterMenu/>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sliderdescription: {
    width: "90%",
  },
  slidertitle: {
    color:"#2F2E5F",
    fontSize:18,
    fontWeight:"bold",
    margin: 20,
  },  joinButton: {
    backgroundColor: "#2F2E5F",
    padding: 10,
    borderRadius: 20,
    width: 150,
    marginTop: 20,
    marginBottom: 20,
  },  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  slidercontent: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    overflow: "scroll",
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
    marginLeft: 20,
    marginRight: 10,
    borderColor: "black",
  },
  projects: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  project: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white",
    padding: 5,
    width: "90%",
    borderRadius: 10,
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
    borderTopColor: "#AEAEAE",
    borderTopWidth: 1,
    backgroundColor: "white",
    padding: 10,
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
  navigation: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingTop: 5,
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
});

export default Eventvoting;
