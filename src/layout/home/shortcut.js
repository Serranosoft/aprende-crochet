import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { getPatternsQtyInProgress } from "../../utils/sqlite";
import stitchings from "../../../stitchings.json";
import designs from "../../../designs.json";
import { AdsContext, LangContext } from "../../utils/Context";

export default function Shortcut() {

    const [patternsQty, setPatternsQty] = useState(null);
    const [designsQty, setDesignsQty] = useState(null);
    const [patternsInProgress, setPatternsInProgress] = useState(0);
    const { setAdTrigger } = useContext(AdsContext);
    const { language } = useContext(LangContext); 


    useEffect(() => {
        handlePatternsQty();
        handleDesignsQty();
    }, [])
    
    useFocusEffect(
        useCallback(() => {
            handlePatternsInProgress();
        }, [])
    )

    async function handlePatternsQty() {
        const result = stitchings.stitching.length;
        setPatternsQty(result);
    }

    async function handleDesignsQty() {
        const result = designs.designs.flatMap((category) => category.patterns).length;
        setDesignsQty(result);
    }

    async function handlePatternsInProgress() {
        const result = await getPatternsQtyInProgress();
        setPatternsInProgress(result);
    }

    function navigate(urlPath) {
        setAdTrigger((adTrigger) => adTrigger + 1);
        router.push(urlPath);
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Text style={ui.h3}>{language.t("_homeQuickAccess")}</Text>
                <Image source={require("../../../assets/teddy-bear/teddy3.png")} style={styles.teddy} />
            </View>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.box} onPress={() => navigate("/patterns")}>
                    <Image source={require("../../../assets/tutorials.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold]}>{language.t("_homeBox1")}</Text>
                        { patternsQty && <Text style={[ui.muted, ui.lightgray]}>{patternsQty} {language.t("_homeTextBox1")}</Text> }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => navigate("/designs")}>
                    <Image source={require("../../../assets/designs.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold, { flex: 1, flexWrap: "wrap" }]}>{language.t("_homeBox2")}</Text>
                        { designsQty && <Text style={[ui.muted, ui.lightgray]}>{designsQty} {language.t("_homeTextBox2")}</Text> }
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>

                <TouchableOpacity style={styles.box} onPress={() => navigate("/patternsInProgress")}>
                    <Image source={require("../../../assets/my-progress.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold, { flex: 1, flexWrap: "wrap" }]}>{language.t("_homeBox3")}</Text>
                        <Text style={[ui.muted, ui.lightgray]}>{ patternsInProgress > 0 ? `${patternsInProgress} diseños` : language.t("_homeTextBox3") }</Text>
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