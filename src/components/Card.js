import { Dimensions, StyleSheet, Image } from "react-native";
import Animated, { withSpring, interpolate, Extrapolation } from "react-native-reanimated";
import { colors, ui } from "../../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useAnimatedStyle, withDelay, Easing, withTiming, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import Counter from "./counter";
import { AdsContext, LangContext } from "../utils/Context";
import { hasNextStep, isLastStep } from "../layout/steps/stepsUtils";

export default function Card({ step, setCurrent, current, stepsLength, count, setCount, featuredImage }) {
    const [hasImage, setHasImage] = useState(true);
    const position = useSharedValue(0);
    const { setAdTrigger } = useContext(AdsContext);
    const { language } = useContext(LangContext);

    const tap = Gesture.Pan()
        .runOnJS(true)
        .activeOffsetX([300, 300])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            const isSwipeLeft = e.translationX < -60;
            const isSwipeRight = e.translationX > 60;

            if (isSwipeLeft) {
                if (hasNextStep(current, stepsLength)) {
                    setCurrent((current) => current + 1);
                    position.value = withTiming(position.value * 5, { duration: 400, easing: Easing.ease });
                    setTimeout(() => {
                        position.value = Dimensions.get("window").width;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }));
                    }, 250);
                } else {
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }));
                }
            } else if (isSwipeRight) {
                if (current > 0) {
                    setCurrent((current) => current - 1);
                    position.value = withTiming(position.value * 5, { duration: 200, easing: Easing.ease });
                    setTimeout(() => {
                        position.value = -Dimensions.get("window").width;
                        position.value = withDelay(10, withTiming(0, { duration: 200, easing: Easing.ease }));
                    }, 100);
                } else {
                    position.value = withDelay(10, withTiming(0, { duration: 200, easing: Easing.ease }));
                }
            } else {
                // Animar suavemente de vuelta
                position.value = withTiming(0, { duration: 300, easing: Easing.ease });
            }
        }).simultaneousWithExternalGesture();

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacityValue = interpolate(
            Math.abs(position.value),
            [0, 100],
            [1, 0],
            Extrapolation.CLAMP
        );
        return {
            opacity: withTiming(opacityValue, { duration: 200 })
        };
    });

    const height = useSharedValue(230);
    const fontSize = useSharedValue(19);

    const animatedHeight = useAnimatedStyle(() => ({
        width: "100%",
        height: height.value
    }));

    const animatedFontSize = useAnimatedStyle(() => ({
        fontSize: fontSize.value
    }));

    useEffect(() => {
        if (!hasImage) {
            height.value = withTiming(0, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            fontSize.value = withTiming(22, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
        } else {
            height.value = withSpring(200);
            fontSize.value = withTiming(19, { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
        }
    }, [hasImage]);

    return (
        <GestureDetector gesture={tap}>
            <View style={styles.wrapper}>
                <View style={styles.card}>
                    <Animated.View style={[animatedHeight, animatedImageStyle]}>
                        
                            <Image
                                style={styles.image}
                                source={{ uri: step.image || featuredImage }}
                                resizeMode="contain"
                                onError={() => setHasImage(false)}
                                onLoad={() => setHasImage(true)}
                            />
                        
                    </Animated.View>
                    <Counter {...{ count, setCount }} />
                    <Animated.Text style={[ui.text, animatedFontSize, styles.content, animatedTextStyle]}>
                        {language._locale !== "es" ? step.content.en : step.content.es}
                    </Animated.Text>
                </View>
            </View>
        </GestureDetector>
    );
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
});
