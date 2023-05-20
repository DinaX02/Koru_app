//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './screens/Homepage';
import Welcome from './screens/Welcome';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import JoinEventAfterScan from './screens/Joinevent';
import ScanQrCode from './screens/ScanQrCode';
import Eventinfo from './screens/event_info';
 {/* <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage" screenOptions={{ header: () => null }}>
      
        <Stack.Screen name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>*/} 


const Stack = createStackNavigator();

export default function App() {
  return (
    <Eventinfo/>  
  );
}
