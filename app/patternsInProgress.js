import { router, Stack, useFocusEffect } from "expo-router"
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors, ui } from "../src/utils/styles"
import { useCallback, useContext, useEffect, useState } from "react"
import { LangContext } from "../src/utils/Context"
import Header from "../src/layout/header"
import stitchings from "../stitchings.json";
import designs from "../designs.json";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads"
import BottomSheetElement from "../src/layout/bottomSheet/bottomSheetElement"
import Progress from "../src/components/progress"
import { getPatternsInProgress, getProgressFromPattern } from "../src/utils/sqlite"
import useBackHandler from "../src/components/use-back-handler"
import handleLevelString, { handleProgress } from "../src/utils/patternUtils"
import Animated, { FadeInDown, SlideInRight } from "react-native-reanimated"
import { useRenderName } from "../src/hooks/useRenderName"
import Button from "../src/components/button"


export default function PatternsInProgress() {

    const [patterns, setPatterns] = useState([])
    const { language } = useContext(LangContext);

    // Bottom Sheet Variables
    const [openDetails, setOpenDetails] = useState(false);
    const [patternSelected, setPatternSelected] = useState(null);

    useFocusEffect(
        useCallback(() => {
            if (patterns.length > 0) {
                init();
            }
        }, [patterns.length])
    );

    useFocusEffect(
        useCallback(() => {
            setPatterns([]);
            handleMyPatterns();
        }, [])
    );

    async function handleMyPatterns() {
        const result = await getPatternsInProgress();
        const matrix = [...stitchings.stitching, ...designs.designs.flatMap((category) => category.patterns)];
        let elements = [];
        result.forEach((patternInProgress) => {
            const element = matrix.find((el) => el.id === patternInProgress.pattern_id);
            if (element) elements.push(element);
        })
        setPatterns(elements);
    }

    useBackHandler(() => {
        if (openDetails) {
            setOpenDetails(false);
            return true;
        } else {
            return false;
        }
    });

    // Añadir a cada item de data la propiedad con el current de mi progreso
    async function init() {
        const result = await handleProgress(patterns);
        setPatterns(result)
    }

    function handleBottomSheet(pattern) {
        // Establecer el patrón seleccionado 
        setPatternSelected(pattern);
        // Abrir bottomsheet con los valores
        setOpenDetails(true);
    }

    const renderName = useRenderName(language._locale);

    return (
        <>
            <Stack.Screen options={{ header: () => <Header back={true} settings={true} overlay={openDetails} /> }} />

            <View style={styles.container}>
                <View style={styles.hero}>
                    <Text style={ui.h1}>Mis patrones</Text>
                </View>
                {patterns.length > 0 &&
                    <Animated.Image
                        key={Date.now()}
                        source={require("../assets/teddy-bear/teddy12.png")}
                        style={styles.bigTeddy}
                        entering={SlideInRight.duration(1000).delay(250)}
                    />
                }



                <View style={styles.list}>
                    {
                        patterns.length > 0 ?

                            <FlatList
                                data={patterns}
                                numColumns={1}
                                initialNumToRender={6}
                                contentContainerStyle={styles.inner}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Animated.View
                                            entering={FadeInDown.duration(300).delay(350 * index)}
                                            key={item.id}
                                        >
                                            <TouchableOpacity
                                                style={styles.box}
                                                onPress={() => handleBottomSheet(item)}>
                                                <View style={styles.imageWrapper}>
                                                    <Image style={styles.image} source={{ uri: item.image }} />
                                                </View>
                                                <View style={styles.info}>
                                                    <Text style={[ui.h3, ui.bold]}>{renderName(item)}</Text>
                                                    <Progress current={item.progress !== undefined ? item.progress : null} qty={item.qty} />
                                                    <View style={styles.separator}></View>
                                                    <View style={styles.metadata}>
                                                        <View style={styles.row}>
                                                            <View style={styles.iconWrapper}>
                                                                <Image source={require("../assets/level.png")} style={styles.icon} />
                                                            </View>
                                                            <Text style={ui.muted}>{handleLevelString(item.difficulty)}</Text>
                                                        </View>
                                                        <View style={styles.row}>
                                                            <View style={styles.iconWrapper}>
                                                                <Image source={require("../assets/clock.png")} style={styles.icon} />
                                                            </View>
                                                            <Text style={ui.muted}>{item.qty} {language.t("_homeSteps")}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    )
                                }}
                            />
                            :
                            <View style={styles.empty}>
                                <Image source={require("../assets/teddy-bear/teddy13.png")} style={{ width: 100, height: 100 }} />
                                <Text style={ui.h4}>No tienes patrones en progreso</Text>
                                <View style={styles.emptyActions}>
                                    <Button showIcon={false} onPress={() => {
                                        router.navigate("patterns")
                                    }}>
                                        <Text style={[ui.text, ui.bold, ui.white]}>Ver tutoriales</Text>
                                    </Button>
                                    <Button showIcon={false} onPress={() => {
                                        router.navigate("designs")
                                    }}>
                                        <Text style={[ui.text, ui.bold, ui.white]}>Ver diseños</Text>
                                    </Button>
                                </View>
                            </View>
                    }
                    <BannerAd unitId={Platform.OS === "android" ? TestIds.BANNER : TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />

                </View>
            </View>
            {openDetails && <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)" }}></View>}
            <BottomSheetElement {...{ openDetails, setOpenDetails, patternSelected }} />


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        backgroundColor: "#fff",
        paddingTop: 16,
        alignItems: "flex-start"
    },

    hero: {
        paddingHorizontal: 12,
    },

    bigTeddy: {
        position: "absolute",
        opacity: 0.35,
        right: -75,
        top: 125,
        zIndex: -1
    },

    list: {
        width: "100%",
        flex: 1,
    },

    inner: {
        paddingBottom: 80,
        paddingHorizontal: 12,
        gap: 16
    },

    box: {
        flexDirection: "row",
        gap: 16,
        backgroundColor: "rgba(255,255,255, 0.7)",
        paddingRight: 8,
        borderRadius: 16
    },
    imageWrapper: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 140,
        borderRadius: 16,
        objectFit: "cover"
    },
    info: {
        paddingVertical: 8,
        flex: 1.2,
        gap: 4,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.box
    },
    metadata: {
        gap: 8,
        marginTop: 4
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    iconWrapper: {
        width: 22,
        height: 22,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d8d8d8ff"
    },
    icon: {
        width: 16,
        height: 16,
    },
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyActions: {
        flexDirection: "row",
        gap: 16,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 2,
        borderColor: colors.primary
    }



})