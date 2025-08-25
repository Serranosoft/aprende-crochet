import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";
import { useCallback, useContext, useRef, useState } from "react";
import designs from "../../../designs.json";
import Button from "../../components/button";
import Progress from "../../components/progress";
import { AdsContext, LangContext } from "../../utils/Context";
import { router, useFocusEffect } from "expo-router";
import handleLevelString, { handleProgress } from "../../utils/patternUtils";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("screen");
const INITIAL_DATA = designs.designs[0].patterns.slice(0, 2);

export default function Designs() {

    const initialData = useRef(INITIAL_DATA);
    const [data, setData] = useState(null);
    const { language } = useContext(LangContext);
    const { setAdTrigger } = useContext(AdsContext);

    useFocusEffect(
        useCallback(() => {
            init();
        }, [])
    );


    async function init() {
        const result = await handleProgress(initialData.current);
        setData(result)
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/teddy-bear/teddy7.png")} style={styles.bigTeddy} />
            <View style={styles.hero}>
                <Text style={ui.h3}>{language.t("_homeDesignsTitle")}</Text>
                <Image source={require("../../../assets/teddy-bear/teddy6.png")} style={styles.teddy} />

            </View>
            <View style={styles.grid}>
                {data && data.map((pattern) => {
                    return (
                        <TouchableOpacity
                            key={pattern.id}
                            style={styles.box}
                            onPress={() => {
                                setAdTrigger((adTrigger) => adTrigger + 1);
                                router.navigate({
                                    pathname: '/designs',
                                    params: { pattern_id: pattern.id }
                                })
                            }}
                        >
                            {pattern.image.length > 0 && <Image source={{ uri: pattern.image }} style={styles.image} />}
                            <View style={styles.info}>
                                <Text style={[ui.h3, ui.white, ui.bold]}>{language._locale == "es" ? pattern.name.es : pattern.name.en}</Text>
                                <Progress current={pattern.progress} qty={pattern.qty} />
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
                                    <Text style={[ui.muted, ui.white]}>{pattern.qty} {language.t("_homeSteps")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <Button onPress={() => {
                router.navigate("/designs")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            }}>
                <Text style={[ui.h4, ui.white]}>{language.t("_homeDesignsButton")}</Text>
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
        opacity: 0.4,
        left: -125,
        top: -100
    }
})