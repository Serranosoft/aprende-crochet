import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useContext, useEffect, useState } from "react";
import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData, fetchImages } from "../src/utils/data";
import Card from "../src/components/Card";
import { ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import Bubble from "../src/components/bubble";
import Header from "../src/layout/header";
import { LangContext } from "../src/utils/Context";

export default function Category() {

    const params = useLocalSearchParams();
    const { title, name, stepsLength } = params;
    
    const { language } = useContext(LangContext);
    

    const [steps, setSteps] = useState([]);
    const [images, setImages] = useState([]);

    const [current, setCurrent] = useState(0);

    const [triggerAd, setTriggerAd] = useState(0);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (images.length < 1 && steps.length < 1) {
            // Pasos
            const steps = fetchData(name, language._locale);
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
            <Stack.Screen options={{ header: () => <Header title={title} back={true} /> }} />
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <View style={{ alignItems: "center" }}>
                <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            </View>
            <Bubble style={{ position: "absolute", top: 150, left: -100, width: 300, height: 300, opacity: 0.75 }} />
            <View style={styles.wrapper}>
                <Card steps={steps} images={images} setTriggerAd={setTriggerAd} setCurrent={setCurrent} current={current} stepsLength={stepsLength} />
                <Progress current={(current + 1)} qty={stepsLength} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 12,
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