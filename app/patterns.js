import { Stack, useFocusEffect } from "expo-router"
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors, ui } from "../src/utils/styles"
import { useCallback, useContext, useEffect, useState } from "react"
import { LangContext } from "../src/utils/Context"
import Header from "../src/layout/header"
import stitchings from "../stitchings.json";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads"
import BottomSheetElement from "../src/layout/bottomSheet/bottomSheetElement"
import Progress from "../src/components/progress"
import { getProgressFromPattern } from "../src/utils/sqlite"
import useBackHandler from "../src/components/use-back-handler"
import Animated, { FadeInDown } from "react-native-reanimated"


export default function Patterns() {

    const [patterns, setPatterns] = useState([])
    const { language } = useContext(LangContext);

    // Bottom Sheet Variables
    const [openDetails, setOpenDetails] = useState(false);
    const [patternSelected, setPatternSelected] = useState(null);

    useFocusEffect(
        useCallback(() => {
            if (patterns.length > 0) {
                handleProgress();
            }
        }, [patterns.length])
    );

    useEffect(() => {
        setPatterns(stitchings.stitching);
    }, [])

    useBackHandler(() => {
        if (openDetails) {
            setOpenDetails(false);
            return true;
        } else {
            return false;
        }
    });

    // Añadir a cada item de data la propiedad con el current de mi progreso
    async function handleProgress() {
        const updated = await Promise.all(
            patterns.map(async (pattern) => {
                const x = await getProgressFromPattern(pattern.id);
                return {
                    ...pattern,
                    progress: x !== null ? parseInt(x.progress) : pattern.progress
                };
            })
        );
        setPatterns(updated);
    }

    function handleBottomSheet(pattern) {
        // Establecer el patrón seleccionado 
        setPatternSelected(pattern);
        // Abrir bottomsheet con los valores
        setOpenDetails(true);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <Header back={true} settings={true} overlay={openDetails} /> }} />

            <View style={styles.container}>
                <View style={styles.hero}>
                    <Text style={ui.h1}>Patrones</Text>
                </View>
                <Image source={require("../assets/teddy-bear/teddy7.png")} style={styles.bigTeddy} />



                <View style={styles.list}>
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
                                            <Text style={[ui.h3, ui.bold]}>{language._locale !== "es" ? item.name.en : item.name.es}</Text>
                                            <Progress current={item.progress !== undefined ? item.progress : null} qty={item.qty} />
                                            <View style={styles.separator}></View>
                                            <View style={styles.metadata}>
                                                <View style={styles.row}>
                                                    <View style={styles.iconWrapper}>
                                                        <Image source={require("../assets/level.png")} style={styles.icon} />
                                                    </View>
                                                    <Text style={ui.muted}>Principiante</Text>
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
        right: -120,
        top: 0,
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


})