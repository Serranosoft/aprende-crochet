import { Image, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData, fetchImages } from "../src/utils/data";
import Card from "../src/components/Card";
import { colors, ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import Bubble from "../src/components/bubble";
import Header from "../src/layout/header";
import { AdsContext, LangContext } from "../src/utils/Context";
import stitchings from "../stitchings.json";
import designs from "../designs.json";
import Counter from "../src/components/counter";
import Button from "../src/components/button";
import { handleCounter, handleProgress, updateCounter } from "../src/utils/sqlite";

export default function Steps() {

    const params = useLocalSearchParams();
    const { id, step } = params;
    const { language } = useContext(LangContext);
    const { setAdTrigger } = useContext(AdsContext);

    const [steps, setSteps] = useState([]);
    const [title, setTitle] = useState(null);
    const [current, setCurrent] = useState(parseInt(step));

    const [count, setCount] = useState(null);

    useEffect(() => {
        console.log("useEffect.");
        fetchSteps();
        handlePattern();
    }, [])

    async function handlePattern() {
        // Gestión del progreso (Añadir nuevo patrón o actualizar su progreso)
        await handleProgress(id, current);

        // Gestión del contador (Añadir un nuevo contador si no existe, sino debo actualizarlo)
        const count = await handleCounter(id);
        setCount(parseInt(count));
    }

    useEffect(() => {
        if (count !== null) {
            updateCounter(id, count);
        }
    }, [count])

    async function fetchSteps() {
        const matrix = [stitchings.stitching, designs.designs];
        const element = matrix.map((arr) => arr.find((el) => el.id === id));
        setTitle(language._locale !== "es" ? element[0].name.en : element[0].name.es);
        setSteps(element[0].steps);
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
                {steps.length > 0 &&
                    <Card
                        step={language._locale !== "es" ? steps[current].content.en : steps[current].content.es}
                        image={steps[current].image}
                        setCurrent={setCurrent}
                        current={current}
                        stepsLength={steps.length}
                        setAdTrigger={setAdTrigger}
                        count={count}
                        setCount={setCount}
                    />
                }
            </View>
            <View style={styles.progressWrapper}>
                <Progress current={(current + 1)} qty={steps.length} large />
            </View>
            <View style={styles.footer}>
                <Button showIcon={false}>
                    <Text style={[ui.text, ui.white]}>Anterior</Text>
                </Button>
                <Button showIcon={false}>
                    <Text style={[ui.text, ui.white]}>Siguiente</Text>
                </Button>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 24
    },

    progressWrapper: {
        alignItems: "center",
    }
})