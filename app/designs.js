import { Link, Stack } from "expo-router"
import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native"
import { ui } from "../src/utils/styles"
import { useMemo, useState } from "react"
import { clothes } from "../src/utils/data"
import Bubble from "../src/components/bubble"

export default function Designs() {

    const [designs, setDesigns] = useState([])
    useMemo(() => setDesigns(clothes), [designs]);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Text style={ui.h1}>¡Diseños de crochet!</Text>
                    <Text style={ui.muted}>Listado completo de nuestros diseños</Text>
                </View>

                <Bubble style={{ position: "absolute", top: -200, left: -100, width: 300, height: 300, opacity: 0.75 }} />

                <View style={styles.list}>
                    <FlatList
                        data={designs}
                        numColumns={1}
                        initialNumToRender={6}
                        renderItem={({ item, i }) => {
                            return (
                                <View key={i} style={styles.row}>
                                    <Link asChild href={{ pathname: "/category", params: { name: item.name, stepsLength: item.steps } }}>
                                        <Pressable>
                                            <View style={styles.item}>
                                                <Image style={styles.rowImage} source={{ uri: item.image }} />
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
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 36,
        paddingTop: StatusBar.currentHeight + 32,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        alignItems: "flex-start"
    },

    list: {
        width: "100%",
        flex: 1,
    },

    row: {
        marginVertical: 8,
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
})