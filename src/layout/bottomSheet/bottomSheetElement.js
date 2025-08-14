import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import { useCallback, useContext, useEffect, useRef } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { LangContext } from "../../utils/Context";
import Button from "../../components/button";
import { router } from "expo-router";


export default function BottomSheetElement({ openDetails, setOpenDetails, patternSelected }) {

    const { language } = useContext(LangContext);
    // ref
    const bottomSheetRef = useRef(null);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        if (openDetails) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [openDetails])


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
                        <Text style={ui.h2}>{language._locale !== "es" ? patternSelected.name.en : patternSelected.name.es}</Text>
                        <View style={styles.metadata}>
                            <View style={styles.row}>
                                <View style={styles.iconWrapper}>
                                    <Image source={require("../../../assets/level.png")} style={styles.icon} />
                                </View>
                                <Text style={ui.text}>Principiante</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.iconWrapper}>
                                    <Image source={require("../../../assets/clock.png")} style={styles.icon} />
                                </View>
                                <Text style={ui.text}>{patternSelected.qty} {language.t("_homeSteps")}</Text>
                            </View>
                        </View>
                        <View style={styles.metadata}>
                            <>
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
                                        <View style={styles.metadata}>
                                            <View style={styles.iconWrapper}>
                                                <Image source={require("../../../assets/wool-needle.png")} style={styles.icon} />
                                            </View>
                                            <Text style={ui.text}>Aguja de lana</Text>
                                        </View>
                                    </View>
                                }
                            </>
                        </View>
                        {
                            patternSelected.progress !== undefined &&
                            <Button onPress={() => {
                                router.navigate({
                                    pathname: '/steps',
                                    params: { id: patternSelected.id, step: patternSelected.progress }
                                })
                            }}>
                                <Text style={[ui.text, ui.white]}>Continuar con el paso {(parseInt(patternSelected.progress) + 1)}</Text>
                            </Button>
                        }
                        <View style={styles.steps}>
                            {patternSelected.steps?.map((step, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.step} onPress={() => {
                                        router.navigate({
                                            pathname: '/steps',
                                            params: { id: patternSelected.id, step: index }
                                        })
                                    }}>
                                        <Image source={{ uri: step.image }} style={styles.stepImg} />
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
        alignItems: "center",
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

})