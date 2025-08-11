import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";
import { router } from "expo-router";

export default function Shortcut() {

    return (
        <View style={styles.container}>
            <Text style={ui.h3}>Acceso rápido</Text>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.box} onPress={() => router.push("/")}>
                    <Image source={require("../../../assets/corner.png")} style={styles.decoration} />
                    <Image source={require("../../../assets/tutorials.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold]}>Aprender desde cero</Text>
                        <Text style={[ui.muted, ui.lightgray]}>12 tutoriales</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => router.push("/")}>
                    <Image source={require("../../../assets/corner.png")} style={styles.decoration} />
                    <Image source={require("../../../assets/designs.png")} style={styles.icon} />
                    <View style={styles.info}>
                        <Text style={[ui.text, ui.white, ui.bold, { flex: 1, flexWrap: "wrap" }]}>Comenzar a diseñar</Text>
                        <Text style={[ui.muted, ui.lightgray]}>21 diseños</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        gap: 16,
    },
    hero: {

    },
    wrapper: {
        width: "100%",
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
    },
    box: {
        flexDirection: "row",
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        padding: 12,
        gap: 8,
        backgroundColor: "#424242",
        flex: 1,
    },
    info: {
        flexShrink: 1,
        gap: 4
    },
    decoration: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
    },
    icon: {
        width: 32,
        height: 32,
    }
})