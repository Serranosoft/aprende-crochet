import { Text, View } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { ui } from "../utils/styles";
import { Link } from "expo-router";

export default function Progress({ current, qty }) {

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${((current) * 100) / qty}%`
    }));

    return (
        <View style={{ gap: 3, marginHorizontal: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[ui.text, ui.bold, {  marginLeft: 3 }]}>{current} / {qty} </Text>
                {
                    current == qty ?
                        <Link href="/"><Text style={[ui.text, ui.bold, { fontSize: 13 }]}>¡Listo! Toca aquí para ver otra guía</Text></Link>
                        :
                        <Text style={[ui.text, ui.bold, { fontSize: 13 }]}>Desliza para ver el siguiente paso</Text>
                }
            </View>
            <View style={{ backgroundColor: "rgba(0,0,0,0.35)", height: 16, borderRadius: 16 }}>
                <Animated.View style={[animatedStyle, { backgroundColor: "#92C742", height: 16, borderRadius: 16 }]}></Animated.View>
            </View>
        </View>
    )
}