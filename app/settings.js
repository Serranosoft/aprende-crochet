import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { AdsContext, LangContext } from "../src/utils/Context";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { colors, ui } from "../src/utils/styles";
import Header from "../src/layout/header";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

export default function Settings() {

    const { language, setLanguage } = useContext(LangContext);
    const { adsLoaded } = useContext(AdsContext);

    const [selected, setSelected] = useState(language._locale);

    const languages = [
        { title: language.t("_langListSpanish"), acronym: "es" },
        { title: language.t("_langListEnglish"), acronym: "en" },
        { title: language.t("_langListArabic"), acronym: "ar" },
        { title: language.t("_langListGerman"), acronym: "de" },
        { title: language.t("_langListFrench"), acronym: "fr" },
        { title: language.t("_langListHindi"), acronym: "hi" },
    ]

    async function updateLanguage(acronym) {
        setLanguage(acronym);
        await AsyncStorage.setItem("language", acronym);
    }

    function handlePress(acronym) {
        updateLanguage(acronym);
        setSelected(acronym);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <Header title={""} back={true} settings={false} /> }} />
            <View style={styles.container}>
                <Animated.Image
                    entering={SlideInLeft.duration(1000).delay(250)}
                    source={require("../assets/teddy-bear/teddy11.png")}
                    style={{ position: "absolute", opacity: 0.35, left: -95, bottom: 0 }}
                />
                <View style={styles.box}>
                    <Text style={[ui.h2, ui.white]}>{language.t("_settingsApp")}</Text>
                    <Text style={[ui.h4, ui.white]}>{language.t("_settingsLang")}</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView style={styles.scroll}>
                            {
                                languages.map((language, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => handlePress(language.acronym)} style={[styles.option, selected === language.acronym && styles.selected]}>
                                            <Text style={[ui.text, { color: selected === language.acronym ? "#fff" : "#000" }]}>{language.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                { adsLoaded && <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} /> }
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        position: "relative",
        flex: 1,
        gap: 12,
        backgroundColor: "#fff"

    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        paddingBottom: 16,
        // borderBottomWidth: 2,
        // borderBottomColor: "#f0f0f0"
    },

    box: {
        gap: 12,
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 16
    },

    scrollContainer: {
        height: 250,
        width: "100%",
    },

    scroll: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
    },
    option: {
        padding: 12,
    },

    selected: {
        backgroundColor: "#b16226ff",
    }
})