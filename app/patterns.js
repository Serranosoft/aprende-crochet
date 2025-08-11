import { Link, router, Stack } from "expo-router"
import { FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors, ui } from "../src/utils/styles"
import { useContext, useEffect, useState } from "react"
import { LangContext } from "../src/utils/Context"
import Header from "../src/layout/header"
import stitchings from "../stitchings.json";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads"


export default function Patterns() {

    const [patterns, setPatterns] = useState([])
    const { language } = useContext(LangContext);

    useEffect(() => {
        setPatterns(stitchings.stitching);
    }, [])

    return (
        <>
            <Stack.Screen options={{ header: () => <Header back={true} settings={true} /> }} />
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Text style={ui.h1}>Patrones</Text>
                </View>
                <BannerAd unitId={Platform.OS === "android" ? TestIds.BANNER : TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                <Image source={require("../assets/teddy-bear/teddy7.png")} style={styles.bigTeddy} />
                


                <View style={styles.list}>
                    <FlatList
                        data={patterns}
                        numColumns={1}
                        initialNumToRender={6}
                        contentContainerStyle={styles.inner}
                        renderItem={({ item, i }) => {
                            console.log(item);
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.box}
                                    onPress={() => {
                                        router.navigate({
                                            pathname: '/item',
                                            params: { id: item.id }
                                        })
                                    }}>
                                    <View style={styles.imageWrapper}>
                                        <Image style={styles.image} source={{ uri: item.image }} />
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={[ui.h3, ui.bold, ui.white]}>{item.name}</Text>
                                        <View style={styles.separator}></View>
                                        <View style={styles.metadata}>
                                            <View style={styles.row}>
                                                <View style={styles.iconWrapper}>
                                                    <Image source={require("../assets/level.png")} style={styles.icon} />
                                                </View>
                                                <Text style={[ui.muted, ui.white]}>Principiante</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.iconWrapper}>
                                                    <Image source={require("../assets/clock.png")} style={styles.icon} />
                                                </View>
                                                <Text style={[ui.muted, ui.white]}>{item.qty} {language.t("_homeSteps")}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        backgroundColor: "#fff",
        alignItems: "flex-start"
    },

    hero: {
        paddingHorizontal: 12,
    },

    bigTeddy: {
        position: "absolute",
        opacity: 0.25,
        right: -125,
        top: 0,
        zIndex: -1
    },

    list: {
        width: "100%",
        flex: 1,
    },

    inner: {
        paddingHorizontal: 12,
        gap: 16
    },

    box: {
        flexDirection: "row",
        gap: 16,
        backgroundColor: colors.box/* "rgba(0,0,0,0.45)" */,
        paddingRight: 8,
        borderRadius: 16
    },
    imageWrapper: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 140,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        objectFit: "cover"
    },
    info: {
        paddingVertical: 8,
        flex: 1,
        gap: 4,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#fff"
    },
    metadata: {
        gap: 8,
        marginTop: 4
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    iconWrapper: {
        width: 22,
        height: 22,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    icon: {
        width: 16,
        height: 16,
    },


})