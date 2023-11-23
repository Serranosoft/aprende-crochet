import { FlatList, StyleSheet, Text, View, StatusBar } from "react-native";
import { Link, Stack } from "expo-router";
import { ui } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useEffect, useMemo, useState } from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../src/utils/constants";
import { categories_raw } from "../src/utils/data";
import { Pressable } from "react-native";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import { scheduleWeeklyNotification } from "../src/utils/notifications";

export default function Home() {

    const [categories, setCategories] = useState([])
    useMemo(() => setCategories(categories_raw), [categories]);
    useEffect(() => scheduleNotification(), []);

    function scheduleNotification() {
        scheduleWeeklyNotification();
    }

    return (
        <View style={styles.container} sharedTransitionTag="first">
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.title}>
                <Text style={ui.h2}>Listado de patrones</Text>
            </View>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            <Text style={[ui.h3, styles.subtitle]}>¡Nuevas guías de navidad abajo del todo!</Text>
            {
                categories.length > 0 ?
                    <View style={styles.list}>
                        <FlatList
                            data={categories}
                            numColumns={1}
                            initialNumToRender={6}
                            renderItem={({ item, i }) => {
                                return (
                                    <Animated.View key={i} style={styles.itemWrapper} sharedTransitionTag="second">
                                        <Link asChild href={{ pathname: "/category", params: { name: item.name, stepsLength: item.steps } }}>
                                            <Pressable>
                                                <View style={styles.item}>
                                                    <Image transition={1000} style={styles.image} source={item.image} placeholder={"LZLruhayXot8W?fQs*jt~8fQ=?js"} />
                                                    <View style={styles.info}>
                                                        <Text style={[ui.h3, ui.bold]}>{item.name}</Text>
                                                        <Text style={ui.text}>{item.steps} pasos</Text>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        </Link>
                                    </Animated.View>
                                )
                            }}
                        />
                    </View>
                    :
                    <LottieView source={require("../assets/lottie/loading-animation.json")} loop={true} autoPlay={true} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight + 24,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },

    title: {
        alignItems: "center",
        gap: 6,
    },

    subtitle: {
        maxWidth: 300, 
        padding: 16, 
        backgroundColor: "#5193F1", 
        color: "#fff", 
        borderRadius: 8, 
        transform: [{ rotate: "3deg" }], 
        marginVertical: 6,
    },

    lottie: {
        width: "100%",
        aspectRatio: 1
    },

    list: {
        flex: 1,
        width: "100%",
    },

    itemWrapper: {
        width: "100%",
        flex: 1,
        padding: 8,
        marginVertical: 16,
        elevation: 10,
        shadowColor: "#5193F1",
        borderWidth: 2,
        borderColor: "#5193F1",
        borderRadius: 16,
        backgroundColor: "white",
    },

    item: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 22,
    },

    image: {
        aspectRatio: 1,
        width: 120,
    },

    info: {
        gap: 5,
    }
})