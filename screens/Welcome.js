import React, { useState }  from 'react';
import { View, Text, Image,Button, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";

const { height, width } = Dimensions.get('window');

const Welcome = () => {
  const {userInfo} = useContext(AuthContext);
  console.log(userInfo);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Image
      source={require('../assets/new_img_welcome.png')}
      style={styles.image}
    />
    
    <View style={styles.textContainer}>
      <Text style={styles.title}>Welcome !</Text>
      <Text style={styles.paragraph}>
        Join events and use coins to vote for the best project
      </Text>
     
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonLogin}
      title="Login"
       onPress={() => navigation.navigate('LogIn')}>
         <Text style={styles.buttonTextLogIN}>Log In</Text>
       
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignUP}
      title="SignUp"
      onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonTextSignUP}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#5c59aa",
  },
  image: {
    alignItems:"center",
    width: '100%',
    height: '60%',
  },
  textContainer: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color:"white",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
    color:"white",
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonLogin: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  
  }, 
   buttonSignUP: {
    backgroundColor: '#615EFD',
    borderRadius: 8,
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonTextLogIN: {
    color:"#625EFD",
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSignUP: {
    color:"white",
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Welcome;