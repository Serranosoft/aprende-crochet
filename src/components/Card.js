import { Dimensions, StyleSheet, Image } from "react-native";
import Animated, { withSpring } from "react-native-reanimated";
import { colors, ui } from "../../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useAnimatedStyle, withDelay, Easing, withTiming, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Card({ step, image, setCurrent, current, stepsLength, setAdTrigger }) {

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
                        setAdTrigger((adTrigger) => adTrigger + 1);
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
                        setAdTrigger((adTrigger) => adTrigger + 1);
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
    const fontSize = useSharedValue(19);

    const animatedHeight = useAnimatedStyle(() => ({
        width: "100%",
        height: height.value
    }))
    const animatedText = useAnimatedStyle(() => ({
        fontSize: fontSize.value
    }))


    useEffect(() => {
        if (!hasImage) {
            height.value = withTiming(0, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1), });
            fontSize.value = withTiming(22, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1), });
        } else {
            height.value = withSpring(200);
            fontSize.value = withTiming(19, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1), });

        }
    }, [hasImage])

    return (
        <GestureDetector gesture={tap}>
            <Animated.View style={[animatedStyle, styles.wrapper]}>
                <View style={styles.card}>
                    <Animated.View style={animatedHeight}>
                        {image &&
                            <Image
                                style={styles.image}
                                source={{ uri: image }}
                                resizeMode="contain"
                                onError={() => setHasImage(false)}
                                onLoad={() => setHasImage(true)}
                            />
                        }

                    </Animated.View>
                    <Animated.Text style={[ui.text, animatedText, styles.content]}>{step}</Animated.Text>
                </View>
            </Animated.View>

        </GestureDetector>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    card: {
        width: "100%",
        gap: 24,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    content: {
        textAlign: "center",
    }
})