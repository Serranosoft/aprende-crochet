import { Text, TouchableOpacity, View } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { ui } from "../utils/styles";
import { router } from "expo-router";
import { LangContext } from "../utils/Context";
import { useContext } from "react";

export default function Progress({ current, qty }) {

    const { language } = useContext(LangContext);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${((current) * 100) / qty}%`
    }));

    return (
        <>
            {current > 0 &&
                <View style={{ gap: 3 }}>
                    <View style={{ backgroundColor: "rgba(0,0,0,0.35)", height: 12, borderRadius: 16 }}>
                        <Animated.View style={[animatedStyle, { backgroundColor: "#00C853", height: 12, borderRadius: 16, justifyContent: "center", alignItems: "center" }]}>
                            <Text style={[ui.muted, ui.bold, ui.center, { lineHeight: 13, fontSize: 11.5 }]}>{current}/{qty} </Text>
                        </Animated.View>
                    </View>
                </View>
            }
        </>
    )
}