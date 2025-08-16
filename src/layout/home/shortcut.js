import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getPatternsInProgress } from "../../utils/sqlite";
import stitchings from "../../../stitchings.json";
import designs from "../../../designs.json";

export default function Shortcut() {

    const [patternsQty, setPatternsQty] = useState(null);
    const [designsQty, setDesignsQty] = useState(null);
    const [patternsInProgress, setPatternsInProgress] = useState(0);

    useEffect(() => {
        handlePatternsQty();
        handleDesignsQty();
        handlePatternsInProgress();
    }, [])

    async function handlePatternsQty() {
        const result = stitchings.stitching.length;
        setPatternsQty(result);
    }

    async function handleDesignsQty() {
        const result = designs.designs.length;
        setDesignsQty(result);
    }

    async function handlePatternsInProgress() {
        const result = await getPatternsInProgress();
        setPatternsInProgress(result);
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Text style={ui.h3}>Acceso rápido</Text>
                <Image source={require("../../../assets/teddy-bear/teddy3.png")} style={styles.teddy} />
            </View>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.box} onPress={() => router.push("/patterns")}>
                    <Image source={require("../../../assets/tutorials.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold]}>Aprender desde cero</Text>
                        { patternsQty && <Text style={[ui.muted, ui.lightgray]}>{patternsQty} tutoriales</Text> }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => router.push("/designs")}>
                    <Image source={require("../../../assets/designs.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold, { flex: 1, flexWrap: "wrap" }]}>Comenzar a diseñar</Text>
                        { designsQty && <Text style={[ui.muted, ui.lightgray]}>{designsQty} diseños</Text> }
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>

                <TouchableOpacity style={styles.box} onPress={() => router.push("/")}>
                    <Image source={require("../../../assets/my-progress.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold, { flex: 1, flexWrap: "wrap" }]}>Ver mis patrones en curso</Text>
                        <Text style={[ui.muted, ui.lightgray]}>{ patternsInProgress > 0 ? `${patternsInProgress} diseños` : "No has comenzado ningún patrón" }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        gap: 16,
    },
    hero: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    wrapper: {
        width: "100%",
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
    },
    box: {
        flexDirection: "row",
        borderRadius: 8,
        padding: 12,
        gap: 8,
        backgroundColor: colors.box,
        flex: 1,
    },
    info: {
        flexShrink: 1,
        gap: 4
    },
    decoration: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
    },
    icon: {
        width: 32,
        height: 32,
    },
    teddy: {
        width: 40,
        height: 40
    }
})