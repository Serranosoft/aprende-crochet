import { StyleSheet, View, Image, Platform } from "react-native";
import { Stack } from "expo-router";
import Header from "../src/layout/header";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import Scroll from "../src/layout/home/scroll";
import Hero from "../src/layout/home/hero";
import LastPattern from "../src/layout/home/lastPattern";
import Stitching from "../src/layout/home/stitching";
import Shortcut from "../src/layout/home/shortcut";
import Designs from "../src/layout/home/designs";
import Animated, { SlideInRight } from "react-native-reanimated";

export default function Index() {

    return (
        <>
            <Stack.Screen options={{ header: () => <Header settings={true} /> }} />
            <View style={styles.container}>
                <Scroll>
                    <Hero />
                    <Animated.Image
                        key={Date.now()}
                        entering={SlideInRight.duration(1000).delay(250)}
                        source={require("../assets/teddy-bear/teddy5.png")} 
                        style={{ position: "absolute", opacity: 0.4, right: -115, top: 185 }}
                    />
                    <LastPattern />
                    <Shortcut />
                    <BannerAd unitId={Platform.OS === "android" ? TestIds.BANNER : TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                    <Stitching />
                    <Designs />

                </Scroll>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        backgroundColor: "#fff",
        alignItems: "flex-start"
    }
})