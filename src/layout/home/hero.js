import { Image, StyleSheet, Text, View } from "react-native";
import { ui } from "../../utils/styles";
import { useContext } from "react";
import { LangContext } from "../../utils/Context";

export default function Hero() {
    const { language } = useContext(LangContext);

    return (
        <View style={styles.container}>
            <Text style={ui.h1}>{language.t("_homeHeroH1")}</Text>
            <Image source={require("../../../assets/teddy-bear/teddy2.png")} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    image: {
        width: 54,
        height: 54
    }
})