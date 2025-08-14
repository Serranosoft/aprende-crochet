import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";
import { LangContext } from "../utils/Context";
import { useContext, useEffect } from "react";

export default function Progress({ current, qty, large = false }) {

    const progress = useSharedValue(0);

    useEffect(() => {
        const newProgress = ((parseInt(current) + 1) / qty) * 100; // en porcentaje
        progress.value = withTiming(newProgress, { duration: 400 });
    }, [current, qty]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value}%` // porcentaje animado
        };
    });

    return (
        <>
            {current !== null &&
                <View style={styles.container}>
                    <View style={{ backgroundColor: "rgba(0,0,0,0.35)", height: large ? 24 : 14, borderRadius: 16, borderWidth: 2, borderColor: colors.primary }}>
                        <View style={styles.indicator}>
                            <Text style={[ui.muted, ui.bold, ui.center, ui.white, { fontSize: large ? 16.5 : 11.5, lineHeight: 11 }]}>{(parseInt(current) + 1)}/{qty} </Text>
                        </View>
                        <Animated.View style={[animatedStyle, { backgroundColor: colors.primary, height: large ? 20 : 10, borderRadius: 16 }]}></Animated.View>
                    </View>
                </View>
            }
        </>
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