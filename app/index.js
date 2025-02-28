import { FlatList, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { ui } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useEffect, useMemo, useState } from "react";
import { categories_raw, clothes } from "../src/utils/data";
import { Pressable } from "react-native";
import Button from "../src/components/button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Bubble from "../src/components/bubble";
import Constants from "expo-constants";

export default function Home() {

    const [categories, setCategories] = useState([])
    const router = useRouter();
    useMemo(() => setCategories(categories_raw), [categories]);
    useEffect(() => scheduleNotification(), []);

    function scheduleNotification() {
        // scheduleWeeklyNotification();
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>

                <Bubble style={{ position: "absolute", top: -200, left: -100, width: 300, height: 300, opacity: 0.75 }} />

                <View>
                    <Text style={ui.h1}>¡Hola!</Text>
                    <Text style={ui.muted}>Diseños de crochet que tenemos disponibles</Text>
                </View>

                <View style={styles.grid}>
                    <Link style={[styles.box, { backgroundColor: "#00b6ff" }]} href={{ pathname: "/category", params: { name: clothes[clothes.length - 1].name, stepsLength: clothes[clothes.length - 1].steps } }} asChild>
                        <TouchableOpacity>
                            <Image source={{ uri: clothes[clothes.length - 1].image }} style={styles.icon} />
                            <View style={styles.boxContent}>
                                <Text style={[ui.h3, ui.bold]}>{clothes[clothes.length - 1].name}</Text>
                                <Text style={ui.muted}>{clothes[clothes.length - 1].steps} pasos a seguir</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <View style={styles.group}>
                        <Link style={[styles.box, { backgroundColor: "#00d2eb" }]} href={{ pathname: "/category", params: { name: clothes[clothes.length - 2].name, stepsLength: clothes[clothes.length - 2].steps } }} asChild>
                            <TouchableOpacity>
                                <View style={styles.pill}>
                                    <Text style={[ui.muted, { color: "#fff" }]}>¡Tendencia!</Text>
                                </View>
                                <Image source={{ uri: clothes[clothes.length - 2].image }} style={styles.smallIcon} />
                                <View style={styles.boxContent}>
                                    <Text style={[ui.h4, ui.bold]}>{clothes[clothes.length - 2].name}</Text>
                                    <Text style={ui.muted}>{clothes[clothes.length - 1].steps} pasos a seguir</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>

                        <Link style={[styles.box, { backgroundColor: "#00e7be" }]} href={{ pathname: "/category", params: { name: clothes[clothes.length - 3].name, stepsLength: clothes[clothes.length - 3].steps } }} asChild>
                            <TouchableOpacity>
                                <Image source={{ uri: clothes[clothes.length - 3].image }} style={styles.smallIcon} />
                                <View style={styles.boxContent}>
                                    <Text style={[ui.h4, ui.bold]}>{clothes[clothes.length - 3].name}</Text>
                                    <Text style={ui.muted}>{clothes[clothes.length - 1].steps} pasos a seguir</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>

                <Button
                    onClick={() => router.navigate("/designs")}
                    icon={<MaterialIcons name="menu-book" size={24} color="#fff" />}
                    text={"Ver todos los diseños"}
                />

                <Text style={[ui.h3, { marginTop: 16 }]}>Aprende todos los puntos</Text>
                {
                    categories.length > 0 ?
                        <View style={styles.list}>
                            <FlatList
                                data={categories}
                                numColumns={1}
                                initialNumToRender={6}
                                renderItem={({ item, i }) => {
                                    return (
                                        <View key={i} style={styles.row}>
                                            <Link asChild href={{ pathname: "/category", params: { name: item.name, stepsLength: item.steps } }}>
                                                <Pressable>
                                                    <View style={styles.item}>
                                                        <Image transition={1000} style={styles.rowImage} source={item.image} placeholder={"LZLruhayXot8W?fQs*jt~8fQ=?js"} />
                                                        <Text style={[ui.h4, ui.bold, styles.rowTitle]}>{item.name}</Text>
                                                        <Text style={[ui.muted, { marginLeft: "auto" }]}>{item.steps} pasos</Text>
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
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        paddingTop: Constants.statusBarHeight + 32,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        alignItems: "flex-start"
    },

    grid: {
        flexDirection: "row",
        gap: 8,
        height: 250,
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