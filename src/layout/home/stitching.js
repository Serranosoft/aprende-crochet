import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";
import { useEffect, useState } from "react";
import stitchings from "../../../stitchings.json";
import getDifficultyIcon from "../../utils/iconsHandler";
import Button from "../../components/button";
import Progress from "../../components/progress";
import { getProgressFromPattern } from "../../utils/sqlite";

const { width } = Dimensions.get("screen");

export default function Stitching() {

    const [data, setData] = useState(null);

    useEffect(() => {
        setData(stitchings.stitching);
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
            <Text style={ui.h3}>Tutoriales básicos de crochet</Text>
            <View style={styles.grid}>
                {data?.map((pattern) => {
                    return (
                        <TouchableOpacity style={styles.box}>
                            {pattern.image.length > 0 && <Image source={{ uri: pattern.image }} style={styles.image} />}
                            <View style={styles.info}>
                                <Text style={[ui.h3, ui.white, ui.bold]}>{pattern.name}</Text>
                                <Progress current={pattern.progress || 0} qty={pattern.qty} />
                                <View style={styles.separator}></View>
                                <View style={styles.row}>
                                    <Image source={getDifficultyIcon(pattern.difficulty)} style={styles.icon} />
                                    <Text style={[ui.muted, ui.white]}>Principiante</Text>
                                </View>
                                <View style={styles.row}>
                                    <Image source={require("../../../assets/check-list.png")} style={styles.icon} />
                                    <Text style={[ui.muted, ui.white]}>{pattern.qty} pasos</Text>
                                </View>
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
    icon: {
        width: 16,
        height: 16,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#fff"
    }
})