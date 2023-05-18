import React, { useState }  from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const { height, width } = Dimensions.get('window');

const LogIn = () => {
   
  return (
  
  <LinearGradient 
    style={{
    height: height, 
    width: width, 
    marginTop: 15, 
    borderRadius: 5}}
  
    colors={['#807DFF','#4E4D8D']}>
  
 
    <Text>Welcome</Text>
    </LinearGradient>

  );
};

export default LogIn;