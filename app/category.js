import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../src/utils/styles";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";
import LottieView from 'lottie-react-native';
import { useAnimatedStyle, withDelay, Easing, withTiming, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import Progress from "../src/components/progress";
import { asc } from "../src/utils/order";

export default function Category() {

    const params = useLocalSearchParams();
    const { id, bucket, name } = params;

    const [steps, setSteps] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const position = useSharedValue(0);

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id])

    async function fetch() {

        // Obtener todas las imagenes de la carpeta correspondiente.
        await supabase.from("Categories")
            .select("step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, step12, step13, step14")
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
            setRoutes(asc(arr));
        })
    }

    useEffect(() => {
        if (routes && routes.length > 0) {
            let images = [];
            routes.forEach(route => {
                getImgURL(route, images);
            })
            setImages(images);
        }
    }, [routes])

    async function getImgURL(name, images) {
        const { data } = supabase.storage.from("images").getPublicUrl(`${bucket}/${name}`);
        images.push(data.publicUrl);
    }

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            if (e.translationX < -60) {
                if (current < images.length - 1) {
                    position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                    if (e.translationX < 60 && e.translationX > -60) {
                        position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                    }
                    setTimeout(() => {
                        setCurrent(current + 1);
                        position.value = Dimensions.get("window").width;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
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
                    }, 250)

                } else {
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                }
            }

        })


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));


    return (
        <View style={styles.parent}>
            <Stack.Screen options={{ headerShown: false }} />
            <GestureDetector gesture={tap}>
                {steps && images ?
                    <Animated.View style={[animatedStyle, styles.container]}>
                        <Text style={ui.textTitle}>{name}</Text>
                        <Image
                            style={styles.image}
                            source={images[current]}
                        />
                        {steps.length > 0 &&
                            <View style={styles.card}>
                                <Text style={ui.text}>{steps[current]}</Text>
                            </View>
                        }
                    </Animated.View>
                    :
                    <LottieView source={require("../assets/lottie/loading-animation.json")} style={styles.lottie} loop={true} autoPlay={true} />
                }
            </GestureDetector>
            {steps && images && <Progress current={current} qty={images.length} />}
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        gap: 16,
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    container: {
        flex: 1,
        backgroundColor: "#5193F0",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
    },
    card: {
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        contentFit: "contain",
    },
    button: {
        alignSelf: "center",
        paddingVertical: 5,
        paddingHorizontal: 24,
        backgroundColor: "#5193F0",
        borderWidth: 2,
        borderColor: "#fff",
        alignItems: "center",
        borderRadius: 8,
    }
})