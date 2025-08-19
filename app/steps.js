import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import Progress from "../src/components/progress";
import Card from "../src/components/Card";
import { colors, ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import Header from "../src/layout/header";
import { LangContext } from "../src/utils/Context";
import stitchings from "../stitchings.json";
import designs from "../designs.json";
import Button from "../src/components/button";
import { handleCounter, handleProgress, updateCounter } from "../src/utils/sqlite";
import { hasNextStep, isLastStep } from "../src/layout/steps/stepsUtils";

export default function Steps() {

    const params = useLocalSearchParams();
    const { id, step } = params;
    const { language } = useContext(LangContext);

    const [steps, setSteps] = useState(null);
    const [title, setTitle] = useState(null);
    const [current, setCurrent] = useState(parseInt(step));

    const [count, setCount] = useState(null);

    useEffect(() => {
        fetchSteps();
        getCounter();
    }, [])

    async function getCounter() {
        // Gestión del contador (Añadir un nuevo contador si no existe, sino debo actualizarlo)
        const count = await handleCounter(id);
        setCount(parseInt(count));
    }

    useEffect(() => {
        if (count !== null) {
            updateCounter(id, count);
        }
    }, [count])

    useEffect(() => {
        updateProgress();
    }, [current])

    async function updateProgress() {
        await handleProgress(id, current);
    }

    async function fetchSteps() {
        const matrix = [...stitchings.stitching, ...designs.designs.flatMap((category) => category.patterns)];
        const element = matrix.find((el) => el.id === id);
        setTitle(language._locale !== "es" ? element.name.en : element.name.es);
        setSteps(element.steps);
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <Header back={true} /> }} />
            <BannerAd unitId={Platform.OS === "android" ? TestIds.BANNER : TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            <View style={styles.hero}>
                <Text style={ui.h2}>{title}</Text>
            </View>
            <Image source={require("../assets/teddy-bear/teddy8.png")} style={styles.bigTeddy} />
            <View style={styles.wrapper}>
                {steps && steps.length > 0 &&
                    <Card {...{
                        step: steps[current], setCurrent, current, stepsLength: steps.length, count, setCount
                    }} />
                }
            </View>
            {
                steps && isLastStep(current, steps.length) &&
                <View style={styles.footer}>
                    <Image source={require("../assets/teddy-bear/teddy9.png")} style={styles.footerImg} />
                    <Button showIcon={false} onPress={() => router.back() }>
                        <Text style={[ui.muted, ui.white]}>He terminado</Text>
                    </Button>
                </View>
            }
            <View style={styles.progressWrapper}>
                {hasNextStep(current) && <Text style={ui.muted}>Desliza para ver el siguiente paso</Text>}
                { steps && <Progress current={current} qty={steps.length} large /> }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 16,
        paddingBottom: 16,
        backgroundColor: "#fff",
    },

    wrapper: {
        flex: 1,
        gap: 12,
        paddingHorizontal: 16
    },

    hero: {
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 16
    },

    count: {
        justifyContent: "center",
        alignItems: "center",
        width: 72,
        height: 72,
        padding: 8,
        borderRadius: 100,
        backgroundColor: colors.primary,
    },

    bigTeddy: {
        position: "absolute",
        opacity: 0.35,
        left: -150,
        bottom: -35,
        zIndex: -1
    },

    footer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        alignSelf: "center"
    },

    progressWrapper: {
        alignItems: "center",
    },
    footerImg: {
        position: "absolute",
        top: -50,
        right: 0,
        width: 64,
        height: 64
    }
})