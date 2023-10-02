import { Dimensions, Image, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { ui } from "../../src/utils/styles";
import { bannerId } from "../../src/utils/constants";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import LottieView from 'lottie-react-native';
import { useAnimatedStyle, withDelay, Easing, withTiming, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect } from "react";
import { View } from "react-native";

export default function Card({steps, images, setTriggerAd, setCurrent, current}) {

    const position = useSharedValue(0);

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            if (e.translationX < -60) {
                if ((current + 1) < steps.length) {
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

    return (
        <GestureDetector gesture={tap}>
            {steps.length > 0 ?
                <Animated.View style={[animatedStyle, styles.wrapper]}>
                    {images[current] && <Image style={styles.image} source={{ uri: images[current] }} resizeMode="contain" />}
                    {steps.length > 0 &&
                        <View style={styles.card}>
                            <Text style={[ui.text, { textAlign: "center", lineHeight: 21}]}>{steps[current]}</Text>
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
    },
    image: {
        width: "100%",
        height: 230,
    }
})