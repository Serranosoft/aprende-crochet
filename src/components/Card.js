import { Dimensions, Image, StyleSheet, Text } from "react-native";
import Animated, { withSpring } from "react-native-reanimated";
import { ui } from "../../src/utils/styles";
import { bannerId } from "../../src/utils/constants";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import LottieView from 'lottie-react-native';
import { useAnimatedStyle, withDelay, Easing, withTiming, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Card({ steps, images, setTriggerAd, setCurrent, current, stepsLength }) {

    const [hasImage, setHasImage] = useState(true);

    const position = useSharedValue(0);

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            if (e.translationX < -60) {
                if ((current + 1) < stepsLength) {
                    position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                    if (e.translationX < 60 && e.translationX > -60) {
                        position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                    }
                    setTimeout(() => {
                        setCurrent((current) => current + 1);
                        position.value = Dimensions.get("window").width;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                        setTriggerAd((triggerAd) => triggerAd + 1);
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
                        setCurrent((current) => current - 1);
                        position.value = -Dimensions.get("window").width;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                        setTriggerAd((triggerAd) => triggerAd + 1);
                    }, 250)

                } else {
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                }
            }

        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));


    const height = useSharedValue(230);
    const animatedHeight = useAnimatedStyle(() => ({
        width: "100%",
        height: height.value,
    }))


    useEffect(() => {
        console.log("On error ?!");
        if (!hasImage) {
            height.value = withTiming(0, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1),});
        } else {
            height.value = withSpring(230);
        }
    }, [hasImage])

    return (
        <GestureDetector gesture={tap}>
            {steps || images ?

                <Animated.View style={[animatedStyle, styles.wrapper]}>

                    {steps.length > 0 &&
                        <View style={styles.card}>
                            <Animated.View style={animatedHeight}>
                                {images[current] &&
                                    <Image
                                        style={styles.image}
                                        source={{ uri: images[current] }}
                                        resizeMode="contain"
                                        onError={() => setHasImage(false)}
                                        onLoad={() => setHasImage(true)}
                                    />
                                }
                            </Animated.View>
                            <Text style={[ui.text, { textAlign: "center", lineHeight: 21 }]}>{steps[current]}</Text>
                        </View>
                    }
                </Animated.View>

                :
                <LottieView source={require("../../assets/lottie/loading-animation.json")} style={styles.lottie} loop={true} autoPlay={true} />
            }
        </GestureDetector>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 20,
    },
    card: {
        width: "100%",
        paddingHorizontal: 18,
        paddingVertical: 8,
        gap: 24, 
    },
    image: {
        width: "100%",
        height: "100%",
    }
})