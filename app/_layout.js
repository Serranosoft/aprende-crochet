import { Slot, SplashScreen } from "expo-router";
import { View, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
// import { StatusBar } from 'expo-status-bar';
export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "SourceSansRegular": require("../assets/fonts/SourceSansPro/SourceSans3-Regular.ttf"),
        "SourceSansMedium": require("../assets/fonts/SourceSansPro/SourceSans3-Medium.ttf"),
    });
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            setReady(true);
        }
    }, [fontsLoaded]);


    return (
        !isReady ?
            <SplashScreen />
            :
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight, paddingHorizontal: 5, backgroundColor: "#5193F0" }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Slot />
                </GestureHandlerRootView>
                <StatusBar style="light" />
            </View >
    )
}