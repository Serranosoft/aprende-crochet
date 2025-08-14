import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import stitchings from "../../../stitchings.json";
import Button from "../../components/button";
import Progress from "../../components/progress";
import { getProgressFromPattern } from "../../utils/sqlite";
import { LangContext } from "../../utils/Context";
import handleLevelString from "../../utils/handleJson";
import { router, useFocusEffect } from "expo-router";

const { width } = Dimensions.get("screen");

export default function Stitching() {

    const [data, setData] = useState(null);
    const dataRef = useRef();
    const { language } = useContext(LangContext);

    useEffect(() => {
        setData(stitchings.stitching.slice(0, 4));
    }, [])

    useEffect(() => {
        dataRef.current = data;
    }, [data])

    useFocusEffect(
        useCallback(() => {
            if (dataRef.current) {
                handleProgress();
            }
        }, [])
    );


    // Añadir a cada item de data la propiedad con el current de mi progreso
    async function handleProgress() {
        const updated = await Promise.all(
            dataRef.current.map(async (pattern) => {
                let x = await getProgressFromPattern(pattern.id);
                return {
                    ...pattern,
                    progress: x !== null ? parseInt(x.progress) : pattern.progress
                };
            })
        );

        setData(updated);
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Text style={ui.h3}>Tutoriales básicos de crochet</Text>
                <Image source={require("../../../assets/teddy-bear/teddy4.png")} style={styles.teddy} />

            </View>
            <View style={styles.grid}>
                {data?.map((pattern) => {
                    return (
                        <TouchableOpacity
                            key={pattern.id}
                            style={styles.box}
                            onPress={() => {
                                router.navigate({
                                    pathname: '/steps',
                                    params: { id: pattern.id, step: pattern.progress || 0 }
                                })
                            }}>
                            {pattern.image.length > 0 && <Image source={{ uri: pattern.image }} style={styles.image} />}
                            <View style={styles.info}>
                                <Text style={[ui.h3, ui.white, ui.bold]}>{language._locale !== "es" ? pattern.name.en : pattern.name.es}</Text>
                                <Progress current={pattern.progress !== undefined ? pattern.progress : null} qty={pattern.qty} />
                                <View style={styles.separator}></View>
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/level.png")} style={styles.icon} />
                                    </View>
                                    <Text style={[ui.muted, ui.white]}>{handleLevelString(pattern.difficulty)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/clock.png")} style={styles.icon} />
                                    </View>
                                    <Text style={[ui.muted, ui.white]}>{pattern.qty} pasos</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <Button onPress={() => router.navigate("/patterns")}>
                <Text style={[ui.h4, ui.white]}>Ver todos los patrones</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        gap: 16,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
    },
    box: {
        position: "relative",
        width: (width - 24 - 8) / 2,
        height: 225,
        justifyContent: "flex-end",
        borderRadius: 16,
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    info: {
        padding: 8,
        gap: 4,
        backgroundColor: "rgba(0,0,0,0.45)",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    iconWrapper: {
        width: 22,
        height: 22,
        backgroundColor: "#fff",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 16,
        height: 16,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#fff"
    },
    hero: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    teddy: {
        width: 40,
        height: 40
    }
})