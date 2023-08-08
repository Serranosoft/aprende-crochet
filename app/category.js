import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ui } from "../src/utils/styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";
import LottieView from 'lottie-react-native';
import { useAnimatedStyle, withDelay, Easing, withTiming, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import Progress from "../src/components/progress";
import { bannerId } from "../src/utils/constants";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import AdsHandler from "../src/components/AdsHandler";

export default function Category() {

    const params = useLocalSearchParams();
    const { id, bucket, name } = params;

    const [steps, setSteps] = useState(null);
    const [image, setImage] = useState(null);
    const [routes, setRoutes] = useState([]);

    const [current, setCurrent] = useState(1);
    const position = useSharedValue(0);

    const [triggerAd, setTriggerAd] = useState(0);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id])

    async function fetch() {

        // Obtener todas las imagenes de la carpeta correspondiente.
        await supabase.from("Categories")
            .select("step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, step12, step13, step14, step15, step16, step17, step18, step19, step20, step21, step22, step23, step24, step25, step26, step27, step28, step29, step30, step31")
            .eq("id", id).then((res) => {
                const steps = Object.values(res.data.reduce((acc, curr) => {
                    for (const [clave, valor] of Object.entries(curr)) {
                        if (valor !== null) {
                            acc[clave] = valor;
                        }
                    }
                    return acc;
                }, {}));

                setSteps(steps);
            });


        await supabase.storage.from("images").list(bucket, {}).then((res) => {
            const arr = res.data.map(item => item.name && item.name);
            setRoutes(arr);
        })

    }

    useEffect(() => {
        const { data } = supabase.storage.from("images").getPublicUrl(`${bucket}/guia-${bucket}-${current}.jpg`);
        if (routes.includes(`guia-${bucket}-${current}.jpg`)) {
            setImage(data.publicUrl);
        } else {
            setImage(null);
        }
    }, [current, routes])

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            if (e.translationX < -60) {
                if (current < steps.length) {
                    position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                    if (e.translationX < 60 && e.translationX > -60) {
                        position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                    }
                    setTimeout(() => {
                        setCurrent(current + 1);
                        position.value = Dimensions.get("window").width;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                        setTriggerAd(() => triggerAd + 1);
                    }, 250)
                } else {
                    // Cargar una vista con el final   
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }));
                }
            } else if (e.translationX > 60) {
                if (current > 0) {
                    position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                    if (e.translationX < 60 && e.translationX > -60) {
                        position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                    }
                    setTimeout(() => {
                        setCurrent(current - 1);
                        position.value = -Dimensions.get("window").width;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                        setTriggerAd(() => triggerAd + 1);
                    }, 250)

                } else {
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                }
            }

        })


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));


    useEffect(() => {
        if (triggerAd === 4) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        }
    }, [triggerAd])


    return (
        <View style={styles.container}>
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <Stack.Screen options={{ headerShown: false }} />
            <GestureDetector gesture={tap}>
                {steps ?
                    <Animated.View style={[animatedStyle, styles.wrapper]}>
                        <Text style={ui.h2}>{name}</Text>
                        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                        {image ? <Image style={styles.image} source={{ uri: image }} /> : <Text></Text>}
                        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                        {steps.length > 0 &&
                            <View style={styles.card}>
                                <Text style={ui.text}>{steps[current - 1]}</Text>
                            </View>
                        }
                    </Animated.View>
                    :
                    <LottieView source={require("../assets/lottie/loading-animation.json")} style={styles.lottie} loop={true} autoPlay={true} />
                }
            </GestureDetector>
            {steps && <Progress current={current} qty={steps.length} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "90%",
        alignSelf: "center",
        paddingTop: 24,
        paddingBottom: 12,
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    card: {
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#5193F1",
        borderRadius: 16,
    },
    image: {
        width: "90%",
        aspectRatio: 1,
        contentFit: "contain",
    }
})