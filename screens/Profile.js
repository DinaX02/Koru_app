import React, {useState, useContext, useEffect} from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../config";

const Profile = ({ navigation }) => {

  const [profile, setProfile] = useState({
    numberOfEvents: "",
    coinsInvested: "",
    recentTransactions: "",
  });
  const {userInfo} = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout()
        .then(() => {
          navigation.navigate('WelcomePage');
        })
        .catch(error => {
          console.log(error)
        });
  };

  useEffect(() => {
    axios
        .get(
            `${BASE_URL}/profile`,
            {
              headers: {
                Authorization: token,
                id: id_user,
              },
            },
        )
        .then(res => {
          setProfile(res.data);
        })
        .catch(e => {
          console.log("error", e);
        });
  }, []);

  return (
   
    <ImageBackground
      source={require("../assets/img_background_login.png")}
      style={styles.backgroundImage}
    >
      <View>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/logo_litle_hompeage.png")}
          />
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.paragraph}>Hi {profile.username} !</Text>
        </View>

        <View style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.titleOverlayBlue}>Number of events:</Text>
            <Text style={styles.paragraphOverlay}>{profile.numberOfEvents}</Text>
            <Text style={styles.titleOverlayBlue}>Coins Invested:</Text>
            <Text style={styles.paragraphOverlay}>
              {profile.coinsInvested || profile.coinsInvested === 0 ? profile.coinsInvested : "0"}
            </Text>
            <Text style={styles.titleOverlayBlue}>Email:</Text>
            <Text style={styles.paragraphOverlay}>
              {profile.email}
            </Text>
            <Text style={styles.titleOverlayBlue}>
              Recent Transactions History:
            </Text>
            <View style={styles.overlayTransaction}>
              {profile.recentTransactions.length === 0 ? (
                  <Text>No transactions made yet</Text>
              ) : (
                  profile.recentTransactions.map((transaction, index) => (
                      <Text key={index}>You invested {transaction.amount} coins in {transaction.name_project}</Text>
                  ))
              )}
            </View>

            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <Text style={styles.titleOverlayBlueLinks}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            handleLogout();
          }
          }
        >
          <Image
            style={styles.logoutIcon}
            source={require("../assets/log_out.png")}
          />
        </TouchableOpacity>
        </View>
      </View> 
    </ScrollView></View>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "flex-start",
    paddingTop: 40,
    marginLeft: 20,
    alignSelf: 'stretch',
  },
  logo: {
    width: 88,
    height: 23,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 14,
    color: "white",
    marginBottom:10,
  },
  scrollView: {
    borderRadius:20,
    width: "90%",
    marginTop: 20,
    marginBottom: 40,
    maxHeight:540,
  },
  contentContainer: {
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    
  },
  titleOverlayBlue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001847",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
  },
  paragraphOverlay: {
    fontSize: 14,
    color: "#001847",
    fontWeight: "normal",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
  },
  overlayTransaction: {
    backgroundColor: "rgba(256, 256, 256, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignSelf: "center",
  },
  titleOverlayBlueLinks: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001847",
    textDecorationLine: "underline",
    marginTop: 20,
    marginRight: 10,
    marginBottom:40,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  logoutIcon: {
    width: 30,
    height: 30,
  },
});

export default Profile;