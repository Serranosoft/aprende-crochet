import { Alert, Platform, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../src/utils/Context";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { ui } from "../src/utils/styles";
import Header from "../src/layout/header";

export default function Settings() {

    const { language, setLanguage } = useContext(LangContext);

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
            <Stack.Screen options={{ header: () => <Header title={"Ajustes"} back={true} settings={false} /> }} />
            <View style={styles.container} /* style={[layout.flex, layout.backgroundLight, padding.bigHorizontal]} */>
                <View style={styles.box}>
                    <Text style={[ui.h2]}>{language.t("_settingsApp")}</Text>
                    <Text style={[ui.h4]}>{language.t("_settingsLang")}</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView style={styles.scroll} /* nestedScrollEnabled={true} */>
                            {
                                languages.map((language, index) => {
                                    console.log(language);
                                    return (
                                        <TouchableOpacity key={index} onPress={() => handlePress(language.acronym)} style={[styles.option, selected === language.acronym && styles.selected]}>
                                            <Text style={[ui.text, { color: selected === language.acronym ? "#fff" : "#000"}]}>{language.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 12,
        backgroundColor: "#fff",

    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#f0f0f0"
    },

    box: {
        gap: 12,
        backgroundColor: "#e3f0ff",
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
        backgroundColor: "#466090",
    }
})