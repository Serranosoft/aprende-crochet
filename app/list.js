import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Link, Stack } from "expo-router";
import { ui } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";
import { fetchCategories } from "../src/utils/supabase";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId } from "../src/utils/constants";

export default function List() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (categories.length < 1) {
            fetchCategories(setCategories)
        }
    }, [categories])


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.title}>
                <Text style={ui.h2}>Listado de patrones</Text>
            </View>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            {
                categories.length > 0 ?
                    <View style={styles.list}>
                        <FlatList
                            data={categories}
                            numColumns={1}
                            renderItem={({ item, i }) => {
                                return (
                                    <TouchableOpacity key={i} style={styles.itemWrapper}>
                                        <Link href={{ pathname: "/category", params: { bucket: item.bucket, name: item.name } }}>
                                            <View style={styles.item}>
                                                <Image
                                                    style={styles.image}
                                                    source={{ uri: item.image+"?cache=1" }}
                                                />
                                                <View style={styles.info}>
                                                    <Text style={[ui.h3, ui.bold]}>{item.name}</Text>
                                                    <Text style={ui.text}>{item.steps} pasos</Text>
                                                </View>
                                            </View>
                                        </Link>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                    </View>
                    :
                    <LottieView source={require("../assets/lottie/loading-animation.json")} loop={true} autoPlay={true} />
            }
            <BannerAd unitId={bannerId} size={BannerAdSize.LARGE_BANNER} requestOptions={{}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 32,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        paddingTop: 48,
        paddingBottom: 16,
        backgroundColor: "white",
    },

    title: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    lottie: {
        width: "100%",
        aspectRatio: 1
    },

    list: {
        flex: 1,
    },

    itemWrapper: {
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
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 16,
    },

    image: {
        aspectRatio: 1,
        width: 120,
    },

    info: {
        gap: 8,
        backgroundColor: "white"
    }


    /* categoryTouch: {
        flex: 1,
        margin: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "white",
    }, */
})