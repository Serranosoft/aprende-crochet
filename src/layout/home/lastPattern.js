import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import stitchings from "../../../stitchings.json";
import designs from "../../../designs.json";
import { ui } from "../../utils/styles";
import Button from "../../components/button";

const INITIAL_PATTERN = "stitching-1";

export default function LastPattern() {

    const [pattern, setPattern] = useState(null);
    const [hasLastPattern, setHasLastPattern] = useState(false);

    async function getPattern() {
        // Obtiene el último patrón
        const lastPattern = await AsyncStorage.getItem("last-pattern") || INITIAL_PATTERN;
        lastPattern !== INITIAL_PATTERN && setHasLastPattern(true);

        const matrix = [stitchings.stitching, designs.designs];
        const element = matrix.map((arr) => arr.find((el) => el.id === lastPattern));
        setPattern(element[0])
    }

    useFocusEffect(
        useCallback(() => {
            getPattern()
        }, [])
    );

    return (
        <>
            {
                pattern &&

                <View style={styles.container}>
                    <View style={styles.decoration}>
                        <View style={styles.card}>
                            <View style={styles.card1}></View>
                            <View style={styles.card2}></View>
                            <Image source={{ uri: pattern.image }} style={styles.image} />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={[ui.text, ui.center]}>{hasLastPattern ? "¿Quieres seguir con el último patrón?" : "¿Quieres comenzar con este patrón?"}</Text>
                        <Button showIcon={false}>
                            <Text style={[ui.text, ui.white]}>{hasLastPattern ? "Ir al último patrón" : "Comenzar"}</Text>
                        </Button>
                    </View>
                    {/* Último patrón en progreso */}
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        gap: 16,
    },
    decoration: {
        paddingLeft: 8,
    },
    card: {
        position: "relative",
        width: 125,
        height: 175,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
        transform: [
            {
                rotate: "-8deg"
            }
        ]

    },
    card1: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#f1f1f1",
        transform: [
            {
                rotate: "-8deg"
            }
        ]
    },
    card2: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#f1f1f1",
        transform: [
            {
                rotate: "12deg"
            }
        ]
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 16
    }
})