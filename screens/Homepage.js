import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#807DFF',
    },
    logo: {
      width: 100,
      height: 25,
      marginTop: 20,
      marginLeft: 20,
    },
    text: {
      fontSize: 24,
      color: '#ffffff',
      margin: 20,
    },
  });

const Homepage = () => {
  return (
<View style={styles.container}>
    
      <Image style={styles.logo} source={require('../assets/logo_litle_hompeage.png')} />
      <Text style={styles.text}>Welcome to Koru</Text>

</View>
  );
};

export default Homepage;