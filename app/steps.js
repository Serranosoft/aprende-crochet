import { Image, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useContext, useEffect, useState } from "react";
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

export default function Steps() {

    const params = useLocalSearchParams();
    const { id, step } = params;
    const { language } = useContext(LangContext);
    const { setAdTrigger } = useContext(AdsContext);

    const [steps, setSteps] = useState([]);
    const [title, setTitle] = useState(null);
    const [current, setCurrent] = useState(parseInt(step));
    console.log(step);
    useEffect(() => {
        fetchSteps();
    }, [])

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
                <Text style={ui.h3}>{title}</Text>
                <Progress current={(current + 1)} qty={steps.length} large />

                {/* <View style={styles.count}> */}
                    {/* <Text style={[ui.h3, ui.white]}>{current + 1}/{steps.length}</Text> */}
                {/* </View> */}
            </View>
            <Image source={require("../assets/teddy-bear/teddy8.png")} style={styles.bigTeddy} />

            {/* <Bubble style={{ position: "absolute", top: 150, left: -100, width: 300, height: 300, opacity: 0.75 }} /> */}
            <View style={styles.wrapper}>
                {steps.length > 0 &&
                    <Card
                        step={language._locale !== "es" ? steps[current].content.en : steps[current].content.es}
                        image={steps[current].image}
                        setCurrent={setCurrent}
                        current={current}
                        stepsLength={steps.length}
                        setAdTrigger={setAdTrigger}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 12,
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
        opacity: 0.25,
        left: -150,
        bottom: -35,
        zIndex: -1
    },
})