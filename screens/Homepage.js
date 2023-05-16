import React, { useState }  from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#807DFF',
    },
    logo: {
      width: 100,
      height: 25,
      marginTop: 60,
      marginLeft: 20,
    },
    text: {
      fontSize: 20,
      color: '#ffffff',
      margin: 20,
    },
    slider: {
        height: 200,
        marginBottom: 20,
      },
      slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
      },
      buttons: {
        flexDirection: 'row',
      },
      buttonHome: {
        width:150,
        height:180,
        ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
        marginHorizontal: 10,
        backgroundColor: '#3F3E78',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
        color: '#ffffff',
        justifyContent: "center"
      },
      buttonsHp:{
        marginBottom: 130,
        flexDirection: 'row',
        justifyContent: "center"
      },
      buttonText: {
        marginTop: 20,
        color: '#ffffff',
      },
      icon: {
        marginTop: 15,
        color: '#ffffff',
      },
      item: {
        margin:20,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 25,
        backgroundColor: '#fff',
        overflow: 'hidden'
      },
      image: {
        width: 267,
        height: 282
      },text2:{
        fontSize: 20,
        color: '#ffffff',
        marginLeft: 20,
        marginBottom: 35,
      }
  });


  const data = [
    {
      id: 1,
      image: require('../assets/img_1_slider_hp.png')
    },
    {
      id: 2,
      image: require ('../assets/img_silder_2.png')
    },
    {
      id: 3,
      image: require('../assets/img_slider_3.png')
    }
  ];

const Homepage = () => {
    const renderItem = ({ item }) => {
        return (
          <View style={styles.item}>
            <Image style={styles.image} source={item.image} />
          </View>
        );
      };


  return (
<View style={styles.container}>
    
      <Image style={styles.logo} source={require('../assets/logo_litle_hompeage.png')} />
      <Text style={styles.text}>Welcome to Koru</Text>

      <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={287}
      itemWidth={277}
      loop
      autoplay={true}
      autoplayInterval={8000} 
    />
      <Text style={styles.text2}>Events</Text>
<View style={styles.buttonsHp}>


      <TouchableOpacity style={styles.buttonHome}>
          <Image source={require('../assets/list_icon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>My List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHome}>
          <Image source={require('../assets/icon_scan.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Join new event</Text>
        </TouchableOpacity>
        </View>
</View>
  );
};

export default Homepage;