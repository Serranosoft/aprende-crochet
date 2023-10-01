import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useEffect, useState } from "react";
import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData } from "../src/utils/data";
import Card from "../src/components/Card";
import { ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../src/utils/constants";

export default function Category() {

    const params = useLocalSearchParams();
    const { name } = params;
    
    const [steps, setSteps] = useState(null);
    const [images, setImages] = useState(null);

    const [current, setCurrent] = useState(0);

    const [triggerAd, setTriggerAd] = useState(0);
    const adsHandlerRef = createRef();

    // Obtener pasos
    useEffect(() => {
        const steps = fetchData(name).steps;
        setSteps(steps);
    }, [])

    // Obtener la imagen que debe mostrarse en este instante.
    useEffect(() => {
        const images = fetchData(name).images;
        setImages(images);
    }, [current])

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
                <Text style={ui.h2}>{name}</Text>
                <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                <Card name={name} steps={steps} images={images} setTriggerAd={setTriggerAd} setCurrent={setCurrent} current={current} />
                {steps && <Progress current={(current+1)} qty={steps.length} />}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.95,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight + 24,
        paddingHorizontal: 24,
        
    }
})