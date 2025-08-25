import { SplashScreen, Stack } from "expo-router";
import { View, StatusBar, StyleSheet, Image, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createRef, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { I18n } from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { translations } from "../src/utils/localizations";
import { AdsContext, LangContext } from "../src/utils/Context";
import * as StoreReview from 'expo-store-review';
import AdsHandler from "../src/components/AdsHandler";
import { initDb } from "../src/utils/sqlite";
import { ui } from "../src/utils/styles";
import UpdatesModal from "../src/layout/updates-modal";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
    
    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "ancizar-regular": require("../assets/fonts/AncizarSans-Regular.ttf"),
        "ancizar-medium": require("../assets/fonts/AncizarSans-Medium.ttf"),
        "ancizar-bold": require("../assets/fonts/AncizarSans-Bold.ttf"),
    });

    // Idioma
    const [language, setLanguage] = useState(getLocales()[0].languageCode || "es");
    const i18n = new I18n(translations);
    i18n.locale = language;
    i18n.enableFallback = true
    i18n.defaultLocale = "es";

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // Gestión base de datos
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        getLanguage();
        loadDb();
    }, [])

    async function loadDb() {
        await initDb();
        setIsReady(true);
    }

    async function getLanguage() {
        const language = await AsyncStorage.getItem("language");
        setLanguage(language || "es");
    }

    // Gestión de anuncios
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (adTrigger > 3) {
            askForReview();
            setShowOpenAd(false);
        }

        if (adsLoaded) {
            if (adTrigger > 4) {
                adsHandlerRef.current.showIntersitialAd();
                setAdTrigger(0);
            }
        }

    }, [adTrigger])

    async function askForReview() {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
        }
    }

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} adsLoaded={adsLoaded} setAdsLoaded={setAdsLoaded} setShowOpenAd={setShowOpenAd} />
            {
                isReady ?
                    <GestureHandlerRootView style={styles.wrapper}>
                        <LangContext.Provider value={{ setLanguage: setLanguage, language: i18n }}>
                            <AdsContext.Provider value={{ setAdTrigger, adsLoaded, setShowOpenAd }}>
                                <Stack />
                                <UpdatesModal />
                            </AdsContext.Provider>
                        </LangContext.Provider>
                    </GestureHandlerRootView>
                    :
                    <View style={styles.loading}>
                        <Image source={require("../assets/teddy-bear/teddy10.png")} style={styles.loadingImg} /> 
                        <Text style={ui.h2}>{i18n.t("_splashLoading")}</Text>
                    </View>
            }
            <StatusBar style="light" backgroundColor={"#fff"} />
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        backgroundColor: "white",
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16
    },
    loadingImg: {
        width: 100,
        height: 100,
    }

})