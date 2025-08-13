import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";

export default function Counter() {

    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={ui.muted}>Número de hilos</Text>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.actionWrapper} onPress={() => setCount((count) => count > 0 ? count - 1 : count)}>
                    <Image source={require("../../assets/minus.png")} style={styles.action} />
                </TouchableOpacity>
                <View style={styles.countWrapper}>
                    <Text style={[ui.h2, styles.count]}>{ count }</Text>
                </View>
                <TouchableOpacity style={styles.actionWrapper} onPress={() => setCount((count) => count + 1)}>
                    <Image source={require("../../assets/plus.png")} style={styles.action} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        alignItems: "center",
    },
    wrapper: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    countWrapper: {
        backgroundColor: "#fff",
        paddingVertical: 4,
        paddingHorizontal: 32,
        borderRadius: 8
    },
    actionWrapper: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    action: {
        width: 20,
        height: 20,
    },
})