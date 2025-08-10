import { StyleSheet, Text, View } from "react-native";
import { ui } from "../../utils/styles";
import { useContext } from "react";
import { LangContext } from "../../utils/Context";

export default function Hero() {
    const { language } = useContext(LangContext);

    return (
        <View style={styles.container}>
            <Text style={ui.h1}>{language.t("_homeHeroH1")}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    }
})