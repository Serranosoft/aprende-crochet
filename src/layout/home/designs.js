import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";
import { useContext, useEffect, useState } from "react";
import designs from "../../../designs.json";
import Button from "../../components/button";
import Progress from "../../components/progress";
import { getProgressFromPattern } from "../../utils/sqlite";
import { LangContext } from "../../utils/Context";

const { width } = Dimensions.get("screen");

export default function Designs() {

    const [data, setData] = useState(null);
    const { language } = useContext(LangContext);

    useEffect(() => {
        setData(designs.designs[0].patterns);
    }, [])

    useEffect(() => {
        if (data) {
            handleProgress();
        }
    }, [data])

    // Añadir a cada item de data la propiedad con el current de mi progreso
    async function handleProgress() {
        data.map(async (pattern) => {
            let progress = await getProgressFromPattern(pattern.id);
            if (progress) {
                pattern.progress = progress;
            }
        })
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/teddy-bear/teddy7.png")} style={styles.bigTeddy} />
            <View style={styles.hero}>
                <Text style={ui.h3}>Patrones y diseños de crochet</Text>
                <Image source={require("../../../assets/teddy-bear/teddy6.png")} style={styles.teddy} />

            </View>
            <View style={styles.grid}>
                {data?.map((pattern) => {
                    return (
                        <TouchableOpacity style={styles.box}>
                            {pattern.image.length > 0 && <Image source={{ uri: pattern.image }} style={styles.image} />}
                            <View style={styles.info}>
                                <Text style={[ui.h3, ui.white, ui.bold]}>{language._locale == "es" ? pattern.name.es : pattern.name.en}</Text>
                                <Progress current={pattern.progress || 0} qty={pattern.qty} />
                                <View style={styles.separator}></View>
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/level.png")} style={styles.icon} />

                                    </View>
                                    <Text style={[ui.muted, ui.white]}>Principiante</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/clock.png")} style={styles.icon} />
                                    </View>
                                    <Text style={[ui.muted, ui.white]}>{pattern.qty} pasos</Text>
                                </View>
                                {
                                    pattern.metadata.scissors &&
                                    <View style={styles.row}>
                                        <View style={styles.iconWrapper}>
                                            <Image source={require("../../../assets/scissor.png")} style={styles.icon} />

                                        </View>
                                        <Text style={[ui.muted, ui.white]}>Tijeras</Text>
                                    </View>
                                }
                                {
                                    pattern.metadata.wool_needle &&
                                    <View style={styles.row}>
                                        <View style={styles.iconWrapper}>
                                            <Image source={require("../../../assets/wool-needle.png")} style={styles.icon} />
                                        </View>
                                        <Text style={[ui.muted, ui.white]}>Aguja de lana</Text>
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <Button>
                <Text style={[ui.h4, ui.white]}>Ver todos los patrones</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        gap: 16,
        position: "relative",
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
        height: 300,
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
    },
    bigTeddy: {
        position: "absolute",
        opacity: 0.25,
        left: -125,
        top: -100
    }
})