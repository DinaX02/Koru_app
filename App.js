//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './screens/Homepage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage" screenOptions={{ header: () => null }}>
      
        <Stack.Screen name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
