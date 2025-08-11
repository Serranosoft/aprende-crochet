import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import { Link, Stack, useFocusEffect, useRouter } from "expo-router";
import { ui } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useCallback, useContext, useState } from "react";
import { fetchDesigns, fetchTutorials } from "../src/utils/data";
import { Pressable } from "react-native";
import Button from "../src/components/button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Bubble from "../src/components/bubble";
import Header from "../src/layout/header";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../src/utils/constants";
import { LangContext } from "../src/utils/Context";
import Scroll from "../src/layout/home/scroll";
import Hero from "../src/layout/home/hero";
import LastPattern from "../src/layout/home/lastPattern";
import Stitching from "../src/layout/home/stitching";
import Shortcut from "../src/layout/home/shortcut";
import Designs from "../src/layout/home/designs";

export default function Index() {

    const [categories, setCategories] = useState([])
    const { language } = useContext(LangContext);
    const [clothes, setClothes] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            const tutorials = fetchTutorials(language._locale);
            setCategories(tutorials);
            const aux = fetchDesigns(language._locale);
            setClothes(aux);
        }, [language])
    );


    return (
        <>
            <Stack.Screen options={{ header: () => <Header settings={true} /> }} />
            <View style={styles.container}>
                <Scroll>
                    <Hero />
                    <Image source={require("../assets/teddy-bear/teddy5.png")} style={{ position: "absolute", opacity: 0.15, right: -100, top: 225 }} />
                    <LastPattern />
                    <Shortcut />
                    <BannerAd unitId={Platform.OS === "android" ? TestIds.BANNER : TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
                    <Stitching />
                    <Designs />

                </Scroll>


                {/* <Bubble style={{ position: "absolute", top: -50, left: -100, width: 300, height: 300, opacity: 0.75 }} /> */}
                {/* <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ alignItems: "flex-start", gap: 12 }} >

                    <View style={styles.paddingHorizontal}>
                        <Text style={ui.muted}>{language.t("_homeHeroH2")}</Text>
                    </View>

                    {
                        clothes.length > 0 &&
                        <View style={styles.grid}>
                            <Link style={[styles.box, { backgroundColor: "#00b6ff" }]} href={{ pathname: "/category", params: { title: clothes[clothes.length - 1].title, name: clothes[clothes.length - 1].name, stepsLength: clothes[clothes.length - 1].steps } }} asChild>
                                <TouchableOpacity>
                                    <Image source={{ uri: clothes[clothes.length - 1].image }} style={styles.icon} />
                                    <View style={styles.boxContent}>
                                        <Text style={[ui.h3, ui.bold]}>{clothes[clothes.length - 1].title}</Text>
                                        <Text style={ui.muted}>{clothes[clothes.length - 1].steps} {language.t("_homeStepsToFollow")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Link>

                            <View style={styles.group}>
                                <Link style={[styles.box, { backgroundColor: "#00d2eb" }]} href={{ pathname: "/category", params: { title: clothes[clothes.length - 2].title, name: clothes[clothes.length - 2].name, stepsLength: clothes[clothes.length - 2].steps } }} asChild>
                                    <TouchableOpacity>
                                        <View style={styles.pill}>
                                            <Text style={[ui.muted, { color: "#fff" }]}>{language.t("_homeTrend")}</Text>
                                        </View>
                                        <Image source={{ uri: clothes[clothes.length - 2].image }} style={styles.smallIcon} />
                                        <View style={styles.boxContent}>
                                            <Text style={[ui.h4, ui.bold]}>{clothes[clothes.length - 2].title}</Text>
                                            <Text style={ui.muted}>{clothes[clothes.length - 1].steps} {language.t("_homeStepsToFollow")}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Link>

                                <Link style={[styles.box, { backgroundColor: "#00e7be" }]} href={{ pathname: "/category", params: { title: clothes[clothes.length - 3].title, name: clothes[clothes.length - 3].name, stepsLength: clothes[clothes.length - 3].steps } }} asChild>
                                    <TouchableOpacity>
                                        <Image source={{ uri: clothes[clothes.length - 3].image }} style={styles.smallIcon} />
                                        <View style={styles.boxContent}>
                                            <Text style={[ui.h4, ui.bold]}>{clothes[clothes.length - 3].title}</Text>
                                            <Text style={ui.muted}>{clothes[clothes.length - 1].steps} {language.t("_homeStepsToFollow")}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    }

                    <View style={styles.paddingHorizontal}>
                        <Button
                            onClick={() => router.navigate("/designs")}
                            icon={<MaterialIcons name="menu-book" size={24} color="#fff" />}
                            text={language.t("_homeButton")}
                        />
                        <Text style={[ui.h3, { marginTop: 16 }]}>{language.t("_homeLearnAll")}</Text>
                    </View>

                    <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />

                    {
                        categories.length > 0 ?
                            <View style={styles.list}>
                                <FlatList
                                    scrollEnabled={false}
                                    data={categories}
                                    numColumns={1}
                                    initialNumToRender={6}
                                    renderItem={({ item, i }) => {
                                        return (
                                            <View key={i} style={styles.row}>
                                                <Link asChild href={{ pathname: "/category", params: { title: item.title, name: item.name, stepsLength: item.steps } }}>
                                                    <Pressable>
                                                        <View style={styles.item}>
                                                            <Image transition={1000} style={styles.rowImage} source={{ uri: item.image }} placeholder={"LZLruhayXot8W?fQs*jt~8fQ=?js"} />
                                                            <Text style={[ui.h4, ui.bold, styles.rowTitle]}>{item.title}</Text>
                                                            <Text style={[ui.muted, { marginLeft: "auto" }]}>{item.steps} {language.t("_homeSteps")}</Text>
                                                        </View>
                                                    </Pressable>
                                                </Link>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            :
                            <LottieView source={require("../assets/lottie/loading-animation.json")} loop={true} autoPlay={true} />
                    }
                </ScrollView> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        // paddingHorizontal: 20,
        backgroundColor: "#fff",
        alignItems: "flex-start"
    },

    wrapper: {
        paddingHorizontal: 12,
    },

    paddingHorizontal: {
        paddingHorizontal: 20,
    },

    grid: {
        flexDirection: "row",
        gap: 8,
        height: 250,
        marginHorizontal: 20,
    },

    box: {
        flex: 1,
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 12,
        justifyContent: "space-between"
    },

    boxContent: {
        alignItems: "flex-start",
    },

    icon: {
        width: 48,
        height: 48,
        borderRadius: 100,
    },

    smallIcon: {
        width: 32,
        height: 32,
        borderRadius: 100,
    },

    group: {
        flex: 1,
        gap: 8,
    },

    list: {
        width: "100%",
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 48,
    },

    row: {
        marginVertical: 6,
        backgroundColor: "#e3f0ff",
        borderRadius: 100,
        paddingRight: 16
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    rowImage: {
        width: 56,
        height: 56,
        borderRadius: 100,
    },

    rowTitle: {
        paddingVertical: 12,
    },

    pill: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "#FF7373",
        position: "absolute",
        top: -10,
        right: 10,
        borderRadius: 8,
    }
})