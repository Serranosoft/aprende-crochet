import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useEffect, useState } from "react";
import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData, fetchImages, getAllImages } from "../src/utils/data";
import Card from "../src/components/Card";
import { ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId } from "../src/utils/constants";

export default function Category() {

    const params = useLocalSearchParams();
    const { name } = params;
    
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
            fetchImages(name).then((result) => setImages(result));
        }
    }, [])

    // Gestión de anuncios
    useEffect(() => {
        if (triggerAd === 4) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        }
    }, [triggerAd])


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <View style={styles.container}>
                <Text style={[ui.h2, {marginBottom: 8}]}>{name}</Text>
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                <Card name={name} steps={steps} images={images} setTriggerAd={setTriggerAd} setCurrent={setCurrent} current={current} />
                {images && images.length > 0 && <Progress current={(current+1)} qty={steps.length} />}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.97,
        width: "100%",
        alignSelf: "center",
        justifyContent: "space-around",
        gap: 12,
        paddingTop: StatusBar.currentHeight + 16,
    }
})