import React, { useEffect, useRef } from 'react';
import {Animated, Easing, StyleSheet, View, Image, BackHandler} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";

const Loading = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.easeIn,
      useNativeDriver: true,
    }).start(() => {

      const onBackPress = () => {
        return true; // Disable back button for Welcome page
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      navigation.navigate('WelcomePage'); // Navegar para a página welcome depois da animação de loading

    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <Image source={require('../assets/icon_animation.png')} style={styles.logoImage} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  logoImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Loading;