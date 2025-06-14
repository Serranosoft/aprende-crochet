import { Link, Stack } from "expo-router"
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { ui } from "../src/utils/styles"
import { useContext, useEffect, useState } from "react"
import { fetchDesigns } from "../src/utils/data"
import Bubble from "../src/components/bubble"
import { LangContext } from "../src/utils/Context"
import Header from "../src/layout/header"

export default function Designs() {

    const [designs, setDesigns] = useState([])
    const { language } = useContext(LangContext);

    useEffect(() => {
        const categories = fetchDesigns(language._locale);
        setDesigns(categories);
    } , []);

    return (
        <>
            <Stack.Screen options={{ header: () => <Header back={true} settings={true} /> }} />
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Text style={ui.h1}>{language.t("_designsTitle")}</Text>
                    <Text style={ui.h4}>{language.t("_designsSubtitle")}</Text>
                </View>

                <Bubble style={{ position: "absolute", top: 85, left: -100, width: 300, height: 300, opacity: 0.75 }} />

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
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 36,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        alignItems: "flex-start"
    },

    hero: {
        zIndex: 1,
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