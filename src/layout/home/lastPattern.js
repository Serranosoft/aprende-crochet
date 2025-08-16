import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import stitchings from "../../../stitchings.json";
import designs from "../../../designs.json";
import { ui } from "../../utils/styles";
import Button from "../../components/button";
import Progress from "../../components/progress";
import { getLastPattern, getProgressFromPattern } from "../../utils/sqlite";

const INITIAL_PATTERN = "stitching-1";

export default function LastPattern() {

    const [pattern, setPattern] = useState(null);
    const [hasLastPattern, setHasLastPattern] = useState(false);


    async function getPattern() {
        const lastPattern = await getLastPattern();
        if (lastPattern) {
            const progress = await getProgressFromPattern(lastPattern);
            const matrix = [stitchings.stitching, designs.designs];
            const element = matrix.map((arr) => arr.find((el) => el.id === lastPattern));

            if (element) {
                const updatedPattern = {...element[0], progress: progress ? parseInt(progress.progress) : 0};
                setPattern(updatedPattern);
                setHasLastPattern(true);
            }
        } else {
            const pattern = stitchings.stitching[0];
            pattern.progress = 0;
            setPattern(pattern);
        }
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
                        <Text style={[ui.h4, ui.center]}>{hasLastPattern ? "¿Quieres seguir con el último patrón?" : "¿Quieres comenzar con este patrón?"}</Text>
                        {hasLastPattern && <Progress current={pattern.progress} qty={pattern.steps.length} />}
                        <Button showIcon={false} onPress={() => {
                            router.navigate({
                                pathname: '/steps',
                                params: { id: pattern.id, step: pattern.progress }
                            })
                        }}>
                            <Text style={[ui.text, ui.white]}>{hasLastPattern ? "Reanudar patrón" : "Comenzar"}</Text>
                        </Button>
                    </View>
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
        gap: 8,
        alignItems: "center"
    },
    decoration: {
        paddingLeft: 8,
    },
    card: {
        position: "relative",
        width: 140,
        height: 150,
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
        borderRadius: 16,
        objectFit: "fill"
    }
})