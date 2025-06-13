import { Text, View } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { ui } from "../utils/styles";
import { Link } from "expo-router";
import { LangContext } from "../utils/Context";
import { useContext } from "react";

export default function Progress({ current, qty }) {

    const { language } = useContext(LangContext);
    

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${((current) * 100) / qty}%`
    }));

    return (
        <View style={{ gap: 3, marginHorizontal: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[ui.text, ui.bold, {  marginLeft: 3 }]}>{current} / {qty} </Text>
                {
                    current == qty ?
                        <Link href="/"><Text style={[ui.muted, ui.bold]}>{language.t("_progressDone")}</Text></Link>
                        :
                        <Text style={[ui.text, ui.bold, { fontSize: 13 }]}>{language.t("_progressSwipe")}</Text>
                }
            </View>
            <View style={{ backgroundColor: "rgba(0,0,0,0.35)", height: 16, borderRadius: 16 }}>
                <Animated.View style={[animatedStyle, { backgroundColor: "#92C742", height: 16, borderRadius: 16 }]}></Animated.View>
            </View>
        </View>
    )
}