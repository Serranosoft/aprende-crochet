import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useEffect, useState } from "react";
import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData, fetchImages } from "../src/utils/data";
import Card from "../src/components/Card";
import { ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import Bubble from "../src/components/bubble";

export default function Category() {

    const params = useLocalSearchParams();
    const { name, stepsLength } = params;

    const [steps, setSteps] = useState([]);
    const [images, setImages] = useState([]);

    const [current, setCurrent] = useState(0);

    const [triggerAd, setTriggerAd] = useState(0);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (images.length < 1 && steps.length < 1) {
            // Pasos
            const steps = fetchData(name);
            setSteps(steps);

            // Imagenes
            fetchImages(name, stepsLength).then((result) => setImages(result));
        }
    }, [])

    // Gestión de anuncios
    useEffect(() => {
        if (triggerAd === 5) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        }
    }, [triggerAd])


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <View style={{ alignItems: "center" }}>
                <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.BANNER} requestOptions={{}} />
            </View>
            <Bubble style={{ position: "absolute", top: -200, left: -100, width: 300, height: 300, opacity: 0.75 }} />
            <View style={styles.wrapper}>
                <Text style={[ui.h2, { marginBottom: 8 }]}>{name}</Text>
                <Card name={name} steps={steps} images={images} setTriggerAd={setTriggerAd} setCurrent={setCurrent} current={current} stepsLength={stepsLength} />
                <Progress current={(current + 1)} qty={stepsLength} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 12,
        paddingTop: StatusBar.currentHeight + 32,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: "#fff",
    },

    wrapper: {
        flex: 1,
        justifyContent: "space-around",
        gap: 12,
    }
})