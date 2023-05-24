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
import Eventvoting from './screens/event_voting';
import Eventliveranking from './screens/event_liveranking';
import Eventlist from './screens/eventlist';
import Loading from './screens/animationINTRO';

const Stack = createStackNavigator();

export default function App() {
  return (
<SignUp/>
  );
}

{/*

    <NavigationContainer>
    <Stack.Navigator
     screenOptions={{
      headerShown: false, // Oculta o cabeçalho em todas as telas
     }}
   initialRouteName="Loading" // screen inicial "Welcome"
     >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Login" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
     <Stack.Screen name="Profile" component={Profile} />
     <Stack.Screen name="JoinEventAfterScan" component={JoinEventAfterScan} />
    </Stack.Navigator>
  </NavigationContainer>



<NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false, // Oculta o cabeçalho em todas as telas
       }}
     initialRouteName="Welcome" // screen inicial "Welcome"
       >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
       <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>*/}