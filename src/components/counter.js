import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import * as Haptics from "expo-haptics";

export default function Counter({ count, setCount }) {

    function handleIncrement() {
        setCount((count) => count + 1)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    function handleDecrement() {
        setCount((count) => count > 0 ? count - 1 : count)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    return (
        <View style={styles.container}>
            <Text style={ui.muted}>Número de hilos</Text>
            <View style={styles.wrapper}>
                <Pressable style={styles.actionWrapper} onPress={() => handleDecrement()}>
                    <Image source={require("../../assets/minus.png")} style={styles.action} />
                </Pressable>
                <View style={styles.countWrapper}>
                    <Text style={[ui.h2, styles.count]}>{count}</Text>
                </View>
                <Pressable style={styles.actionWrapper} onPress={() => handleIncrement()}>
                    <Image source={require("../../assets/plus.png")} style={styles.action} />
                </Pressable>
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