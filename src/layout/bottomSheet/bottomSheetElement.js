import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useCallback, useContext, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { LangContext } from "../../utils/Context";
import Button from "../../components/button";
import { router } from "expo-router";
import handleLevelString from "../../utils/patternUtils";
import { useRenderName } from "../../hooks/useRenderName";
import * as Haptics from "expo-haptics";


export default function BottomSheetElement({ openDetails, setOpenDetails, patternSelected, wools, threads }) {

    const { language } = useContext(LangContext);
    // ref
    const bottomSheetRef = useRef(null);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
    }, []);

    useEffect(() => {
        if (openDetails) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [openDetails])

    function navigateToSteps(step) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        router.navigate({
            pathname: '/steps',
            params: { id: patternSelected.id, step: step, featuredImage: patternSelected.image }
        })
        setOpenDetails(false);
    }

    function getNextStepIndex() {
        return parseInt(patternSelected.progress) < (patternSelected.qty - 1) ?
            parseInt(patternSelected.progress) + 1 :
            parseInt(patternSelected.progress)
    }
    function getNextStepNumber() {
        return (parseInt(patternSelected.progress) + 1) < patternSelected.qty ?
            (parseInt(patternSelected.progress) + 2) :
            patternSelected.qty
    }

    const renderName = useRenderName(language._locale);


    return (
        <BottomSheet
            index={-1}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            backgroundStyle={styles.bottomSheetBackground}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            snapPoints={["85%"]}
            onClose={() => setOpenDetails(false)}

        >
            <View style={styles.container}>
                {
                    patternSelected &&
                    <BottomSheetScrollView contentContainerStyle={styles.content}>
                        <Image source={{ uri: patternSelected.image }} style={styles.image} />
                        <Text style={[ui.h2, ui.center]}>{renderName(patternSelected)}</Text>
                        <View style={styles.metadata}>
                            <View style={styles.row}>
                                <View style={styles.iconWrapper}>
                                    <Image source={require("../../../assets/level.png")} style={styles.icon} />
                                </View>
                                <Text style={ui.text}>{handleLevelString(patternSelected.difficulty)}</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.iconWrapper}>
                                    <Image source={require("../../../assets/clock.png")} style={styles.icon} />
                                </View>
                                <Text style={ui.text}>{patternSelected.qty} {language.t("_homeSteps")}</Text>
                            </View>
                            {
                                patternSelected.metadata?.crochet_needle &&
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/hook.png")} style={styles.icon} />
                                    </View>
                                    <Text style={ui.text}>
                                        { language._locale !== "es" ?
                                            patternSelected.metadata?.crochet_needle.en :
                                            patternSelected.metadata?.crochet_needle.es
                                        }
                                    </Text>
                                </View>
                            }
                            {
                                patternSelected.metadata?.scissors &&
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/scissor.png")} style={styles.icon} />
                                    </View>
                                    <Text style={ui.text}>Tijeras</Text>
                                </View>
                            }
                            {
                                patternSelected.metadata?.wool_needle &&
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Image source={require("../../../assets/wool-needle.png")} style={styles.icon} />
                                    </View>
                                    <Text style={ui.text}>Aguja de lana</Text>
                                </View>
                            }
                            {
                                (patternSelected.metadata?.wool?.length > 0 || patternSelected.metadata?.thread?.length > 0) &&
                                <View style={styles.woolsWrapper}>
                                    <Text style={[ui.h4, ui.bold]}>Necesitarás estos colores</Text>
                                    {
                                        patternSelected.metadata?.wool.length > 0 &&
                                        <View style={styles.woolsGroup}>
                                            <Text style={[ui.text, ui.bold]}>Lana</Text>
                                            <View style={styles.wools}>
                                                {patternSelected.metadata?.wool.map((woolEl) => {
                                                    const wool = wools[woolEl];
                                                    return (
                                                        wool &&
                                                        <View style={styles.wool} key={wool.color}>
                                                            <View style={[styles.woolBall, { backgroundColor: wool.color }]}>
                                                            </View>
                                                            <Text style={ui.muted}>{renderName(wool)}</Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    }
                                    {
                                        patternSelected.metadata?.thread?.length > 0 &&
                                        <View style={styles.woolsGroup}>
                                            <Text style={[ui.text, ui.bold]}>Hilo</Text>
                                            <View style={styles.wools}>
                                                {patternSelected.metadata?.thread.map((threadEl) => {
                                                    const thread = threads[threadEl];
                                                    return (
                                                        thread &&
                                                        <View style={styles.wool} key={thread.color}>
                                                            <View style={[styles.woolBall, { backgroundColor: thread.color }]}>
                                                            </View>
                                                            <Text style={ui.muted}>{renderName(thread)}</Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    }
                                </View>
                            }
                            {
                                patternSelected.metadata?.additional_info?.es.length > 0 &&
                                <View style={styles.additionalInfo}>
                                    <Text style={[ui.h4, ui.bold]}>Además necesitarás estos materiales</Text>
                                    <Text style={ui.muted}>
                                        {
                                            language._locale !== "es" ?
                                                patternSelected.metadata?.additional_info.en
                                                :
                                                patternSelected.metadata?.additional_info.es
                                        }
                                    </Text>
                                </View>
                            }
                        </View>
                        {
                            patternSelected.progress !== null &&
                            <Button onPress={() => navigateToSteps(getNextStepIndex())}>
                                <Text style={[ui.text, ui.white]}>
                                    Continuar con el paso {getNextStepNumber()}
                                </Text>
                            </Button>
                        }
                        <View style={styles.steps}>
                            {patternSelected.steps?.map((step, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.step} onPress={() => navigateToSteps(index)}>
                                        {patternSelected.progress && parseInt(patternSelected.progress) >= index && <Image source={require("../../../assets/tick.png")} style={styles.tickImg} />}
                                        {step.image && <Image source={{ uri: step.image }} style={styles.stepImg} />}
                                        <View style={styles.stepInfo}>
                                            <Text style={ui.h3}>Paso {index + 1}</Text>
                                            <View style={styles.separator}></View>
                                            <Text style={ui.muted} numberOfLines={2}>
                                                {language.locale !== "es" ?
                                                    step.content.en : step.content.es
                                                }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </BottomSheetScrollView>
                }
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheetBackground: {
        borderRadius: 64,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        borderRadius: 64,
        paddingHorizontal: 36,
        paddingTop: 36,
    },
    content: {
        // flex: 1,
        width: "100%",
        gap: 16,
        alignItems: "center",
        paddingBottom: 36,
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 16,
        objectFit: "cover"
    },
    metadata: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    iconWrapper: {
        width: 34,
        height: 34,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d8d8d8ff"
    },
    icon: {
        width: 24,
        height: 24,
    },
    steps: {
        width: "100%",
        gap: 16,
        marginTop: 16
    },
    step: {
        gap: 8,
        borderRadius: 16,
        flexDirection: "row",
        padding: 16,
        backgroundColor: "#f1f1f1",
    },
    stepImg: {
        width: 100,
        height: 100,
        borderRadius: 16,
    },
    stepInfo: {
        padding: 8,
        gap: 8,
        flex: 1,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.box
    },
    tickImg: {
        width: 24,
        height: 24,
        position: "absolute",
        top: 8,
        right: 8,
    },
    woolsWrapper: {
        width: "100%",
    },
    wools: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 8
    },
    woolsGroup: {
        marginTop: 12
    },
    wool: {
        alignItems: "center",
    },
    woolBall: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 100,
    },
    additionalInfo: {
        width: "100%",
        // flexDirection: "row",
        gap: 8,
        // alignItems: "center"
    }

})