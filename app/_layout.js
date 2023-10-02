import { Slot, SplashScreen } from "expo-router";
import { View, StatusBar, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { MobileAds } from 'react-native-google-mobile-ads';

export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Changa": require("../assets/fonts/Changa/Changa.ttf"),
        "Slabo": require("../assets/fonts/Slabo/Slabo.ttf")
    });
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            setReady(true);
        }
    }, [fontsLoaded]);

    MobileAds()
        .initialize()
        .then(adapterStatuses => {
            // Initialization complete!
        });

    return (
        !isReady ?
            <SplashScreen />
            :
            <View style={styles.container}>
                <GestureHandlerRootView style={styles.wrapper}>
                    <Slot />
                </GestureHandlerRootView>
                <StatusBar style="light" />
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

})