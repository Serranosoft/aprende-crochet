import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useContext, useEffect, useState } from "react";
import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData, fetchImages } from "../src/utils/data";
import Card from "../src/components/Card";
import { ui } from "../src/utils/styles";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
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
    const [current, setCurrent] = useState(parseInt(step) || 0);

    useEffect(() => {
        fetchSteps();
    }, [])

    async function fetchSteps() {
        const matrix = [stitchings.stitching, designs.designs];
        const element = matrix.map((arr) => arr.find((el) => el.id === id));
        setSteps(element[0].steps);
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <Header /* title={title} */ back={true} /> }} />
            <View style={{ alignItems: "center" }}>
                <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            </View>
            <Bubble style={{ position: "absolute", top: 150, left: -100, width: 300, height: 300, opacity: 0.75 }} />
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
                {/* <Progress current={(current + 1)} qty={stepsLength} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 12,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: "#fff",
    },

    wrapper: {
        flex: 1,
        justifyContent: "space-around",
        gap: 12,
    }
})