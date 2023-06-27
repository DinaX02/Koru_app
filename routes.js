import React, { useEffect, useRef } from 'react';
import {BackHandler, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Homepage from './screens/Homepage';
import Eventlist from './screens/eventlist';
import Profile from './screens/Profile';
import Welcome from './screens/Welcome';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Project from './screens/Project';
import Eventinfo from './screens/event_info';
import Eventliveranking from './screens/event_liveranking';
import Eventschedule from './screens/event_schedule';
import Eventvoting from './screens/event_voting';
import ScanQrCode from './screens/ScanQrCode';
import Loading from './screens/animationINTRO';
import JoinEventAfterScan from "./screens/Joinevent";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={Homepage} />
        </HomeStack.Navigator>
    );
}

const Top = createMaterialTopTabNavigator();

function Event () {


    return (

        <Top.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    color: "#2F2E5F",
                    fontSize: 14,
                    textTransform: 'capitalize',
                    fontWeight: 700,
                },
                activeLabelStyle:{
                    fontWeight: 800,
                },
                tabBarPressColor: "transparent",
                tabBarStyle:{
                    height: 50,
                },
                tabBarContentContainerStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#2F2E5F",
                    height: 5,
                },

            }}
        >
            <Top.Screen name="About" component={Eventinfo} />
            <Top.Screen name="Voting" component={Eventvoting} />
            <Top.Screen name="Live Ranking" component={Eventliveranking} />
            <Top.Screen name="Schedule" component={Eventschedule} />
        </Top.Navigator>
    );
}

const EventListStack = createStackNavigator();

function EventListStackScreen() {
    return (
        <EventListStack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: "#2F2E5F",
                },
                headerTintColor: 'white',
            }}
        >
            <EventListStack.Screen name="My Event List" component={Eventlist} options={{headerLeft: null,}} />
            <EventListStack.Screen
                name="Event"
                component={Event}
                options={({ route }) => ({
                    title: route.params.title,
                    headerLeft: null,
                })}
            />
            <EventListStack.Screen
                name="Vote"
                component={Project}
                options={({ route }) => ({
                     title: route.params.title,
            })}/>
        </EventListStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfilePage" component={Profile} />
        </ProfileStack.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                unmountOnBlur: true,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    height: Platform.OS === 'ios' ? 90 : 60,
                },
            }}
        >
            <Tab.Screen
                name="Homepage"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={
                                    focused
                                        ? require('./assets/home_active.png')
                                        : require('./assets/home.png')
                                }
                                style={
                                    focused
                                        ? { width: 24, height: 35 }
                                        : { width: 25, height: 25 }
                                }
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Eventlist"
                component={EventListStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={
                                    focused
                                        ? require('./assets/lista_active.png')
                                        : require('./assets/lista.png')
                                }
                                style={
                                    focused
                                        ? { width: 25, height: 35 }
                                        : { width: 25, height: 27 }
                                }
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={
                                    focused
                                        ? require('./assets/profile_active.png')
                                        : require('./assets/profile.png')
                                }
                                style={
                                    focused
                                        ? { width: 25, height: 35 }
                                        : { width: 25, height: 25 }
                                }
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const WelcomeStack = createNativeStackNavigator();

function WelcomeStackScreen() {

    return (
        <WelcomeStack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false,
            }}
        >
            <WelcomeStack.Screen name="Animation" component={Loading} />
            <WelcomeStack.Screen name="WelcomePage" component={Welcome} />
            <WelcomeStack.Screen name="LogIn" component={LogIn} />
            <WelcomeStack.Screen name="SignUp" component={SignUp} />
        </WelcomeStack.Navigator>
    );
}

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeStackScreen} />
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
            <Stack.Screen name="Join" component={JoinEventAfterScan} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
