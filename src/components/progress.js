import { StyleSheet, Text, View } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { colors, ui } from "../utils/styles";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function Progress({ current, qty, large = false }) {

    const progress = useSharedValue(0);
    const firstRender = useRef(true);
    const animateAfterFirstRender = useRef(false);
    const isFocused = useIsFocused();

    // Este bloque solo se ejecuta la primera vez para la primera animación inicial (0% -> current(%))
    useFocusEffect(
        useCallback(() => {
            if (firstRender.current) {
                const newProgress = ((parseInt(current) + 1) / qty) * 100;
                progress.value = 0;
                progress.value = withTiming(newProgress, { duration: 800 });
                firstRender.current = false;
                animateAfterFirstRender.current = false;
            } else {
                firstRender.current = true;
                animateAfterFirstRender.current = false;
            }
        }, [])
    );

    // Este bloque solo se ejecuta después de la primera animación inicial (0% -> current(%)) y se encarga de animar los siguientes x% -> current(%)
    useEffect(() => {
        if (!firstRender.current && !animateAfterFirstRender.current) {
            const newProgress = ((parseInt(current) + 1) / qty) * 100;
            progress.value = withTiming(newProgress, { duration: 400 });
        }
    }, [current, qty, isFocused]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value}%`
        };
    });

    return (
        current !== null &&
        <View style={styles.container}>
            <View style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                height: large ? 24 : 14,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: colors.primary
            }}>
                <View style={styles.indicator}>
                    <Text style={[ui.muted, ui.bold, ui.center, ui.white, { fontSize: large ? 16.5 : 11.5, lineHeight: 11 }]}>
                        {(parseInt(current) + 1)}/{qty}
                    </Text>
                </View>
                <Animated.View style={[animatedStyle, { backgroundColor: colors.primary, height: large ? 20 : 10, borderRadius: 16 }]} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        gap: 3,
        width: "100%",
        maxWidth: 250,
    },
    indicator: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,

    }
})