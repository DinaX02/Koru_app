import React, { useState } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from "react-native-gesture-handler";

const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
};

import FooterMenu from "../components/MenuFooter";


const Eventliveranking = () => {
    const [selectedTab, setSelectedTab] = useState("about");
    const [selectedStatus, setSelectedStatus] = useState("Ongoing");
    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
    };

    const SLIDERTOP = 394;

    const dimensions = useWindowDimensions();

    const top = useSharedValue(dimensions.height);

    const style = useAnimatedStyle(() => {
        return {
            top: withSpring(top.value, SPRING_CONFIG),
        };
    });

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value;
        },
        onActive(event, context) {
            top.value = context.startTop + event.translationY;
        },
        onEnd() {
            if (top.value > SLIDERTOP + 50) {
                top.value = dimensions.height;
            } else {
                top.value = SLIDERTOP;
            }
        },
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <ImageBackground
                source={require("../assets/background.png")}
                style={styles.backgroundImage}
            >

                {/* filter*/}

                <View style={styles.filter}>
                    <Text style={styles.filteroption}>Public</Text>
                    <Text style={styles.filteroptionselected}>Directors</Text>
                    <Text style={styles.filteroption}>Companies</Text>
                </View>

                {/* podium*/}
                <View style={styles.podium}>
                    <View style={styles.currentcoin}><Image style={styles.currentcoinimg} source={require("../assets/coin_red.png")}/></View>
                    <View style={styles.podiumproject}>
                        <Image source={require("../assets/event_join.png")}/>
                        <Text style={styles.podiumprojecttitle}>Officium</Text>
                        <Text style={styles.podiumprojectcoins}>300</Text>
                    </View>
                    <View style={styles.podiumproject1}>
                        <Image source={require("../assets/event_join.png")}/>
                        <Text style={styles.podiumprojecttitle}>Composto</Text>
                        <Text style={styles.podiumprojectcoins}>500</Text>
                    </View>
                    <View style={styles.podiumproject}>
                        <Image source={require("../assets/event_join.png")}/>
                        <Text style={styles.podiumprojecttitle}>Koru</Text>
                        <Text style={styles.podiumprojectcoins}>250</Text>
                    </View>

                </View>


                <ScrollView contentContainerStyle={styles.projects}>
                    <TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    >
                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    >
                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    >
                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    >
                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    ><TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    >
                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity><TouchableOpacity
                        onPress={() => {
                            top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                        }}
                        style={styles.project}
                    >
                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                            }}
                            style={styles.project}
                        >
                            <Image
                                style={styles.projectimage}
                                source={require("../assets/event_join.png")}
                            />
                            <Text>Koru</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                top.value = withSpring(SLIDERTOP, SPRING_CONFIG);
                            }}
                            style={styles.project}
                        >
                            <Image
                                style={styles.projectimage}
                                source={require("../assets/event_join.png")}
                            />
                            <Text>Koru</Text>
                        </TouchableOpacity>


                        <Image
                            style={styles.projectimage}
                            source={require("../assets/event_join.png")}
                        />
                        <Text>Koru</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "white",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            padding: 20,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        style,
                    ]}
                >
                    <View style={styles.sliderline}></View>
                    <View style={styles.slidercontent}>
                        <Image
                            style={{
                                marginTop: 10,
                                borderRadius: dimensions.width / 2,
                                width: dimensions.width * 0.2,
                                height: dimensions.width * 0.2,
                            }}
                            source={require("../assets/image_welcome.png")}
                        />
                        <Text style={styles.slidertitle}>Koru</Text>
                        <Text style={styles.sliderdescription}>
                            Koru is an event tracking platform that allows organizers to
                            create and manage events efficiently, while providing event
                            attendees with a personalized and interactive experience. The app
                            focuses on the dynamics of voting on projects displayed at the
                            event, where participants have coins they can invest in the
                            projects they like the most. Link: Koru_link.com
                        </Text>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    podiumprojectcoins:{
        color: "black",
        fontWeight: "900",
        fontSize: 13,
    },
    podiumprojecttitle:{
        marginTop: -15,
        fontSize: 20,
        color: "white",
        fontWeight: "bold",

    },
    podiumproject1:{
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 15,
    },
    podiumproject:{
        flexDirection: "column",
        alignItems: "center",
        marginTop: 35,
    },
    currentcoinimg:{
        height: 15,
        width: 15,
    },
    currentcoin:{
        backgroundColor: "white",
        width: 40,
        height: 30,
        position: "absolute",
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        top: 15,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

    },
    podium:{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
    },
    filteroptionselected: {
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#2F2E5F",
        padding: 5,
        paddingVertical: 2,
        borderRadius: 5,
        color: "white",
        textAlign: "center",
        marginLeft: 12,
    },
    filteroption:{
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "whitesmoke",
        padding: 5,
        paddingVertical: 2,
        borderRadius: 5,
        color: "#9A9A9A",
        borderColor: "#9A9A9A",
        borderWidth: 1,
        textAlign: "center",
        marginLeft: 12,
    },
    filter: {
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
    },
    sliderdescription: {
        width: "90%",
    },
    slidertitle: {
        margin: 20,
    },
    slidercontent: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
    },
    sliderline: {
        width: 75,
        height: 4,
        backgroundColor: "grey",
        alignSelf: "center",
        borderRadius: 2,
        position: "absolute",
        top: 20,
    },
    projectimage: {
        height: 40,
        width: 40,
        marginLeft: 20,
        marginRight: 10,
        borderColor: "black",
    },
    projects: {
        flexDirection: "column",
        alignItems: "center",
    },
    project: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 5,
        borderBottomColor: "#9A9A9A",
        borderBottomWidth: 1,
        width: "100%",
    },

    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});

export default Eventliveranking;
