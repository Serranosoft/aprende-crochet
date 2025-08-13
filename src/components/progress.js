import { Text, TouchableOpacity, View } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";
import { LangContext } from "../utils/Context";
import { useContext, useEffect } from "react";

export default function Progress({ current, qty, large = false }) {

    const progress = useSharedValue(0);

    useEffect(() => {
        const newProgress = (current / qty) * 100; // en porcentaje
        progress.value = withTiming(newProgress, { duration: 400 });
    }, [current, qty]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value}%` // porcentaje animado
        };
    });

    return (
        <>
            {current > 0 &&
                <View style={{ gap: 3, width: "100%", maxWidth: 250, }}>
                    <View style={{ backgroundColor: "rgba(0,0,0,0.35)", height: large ? 24 : 12, borderRadius: 16, borderWidth: 2, borderColor: colors.primary }}>
                        <Animated.View style={[animatedStyle, { backgroundColor: colors.primary, height: large ? 20 : 12, borderRadius: 16, justifyContent: "center", alignItems: "center", }]}>
                            <Text style={[ui.muted, ui.bold, ui.center, ui.white, { lineHeight: 13, fontSize: large ? 16.5 : 11.5 }]}>{current}/{qty} </Text>
                        </Animated.View>
                    </View>
                </View>
            }
        </>
    )
}