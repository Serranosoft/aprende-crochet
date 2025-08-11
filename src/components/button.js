import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";

export default function Button({ children, onPress, showIcon = true }) {
    return (
        <TouchableOpacity style={[styles.button, !showIcon && styles.bigBtn]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
            {
                showIcon &&
                <View style={styles.imgWrapper}>
                    <Image source={require("../../assets/arrow-right.png")} style={styles.img} />
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        paddingRight: 4,
        paddingLeft: 24,
        paddingVertical: 4,
        borderRadius: 100,
        textAlign: "center",
        backgroundColor: colors.primary,
    },

    bigBtn: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingVertical: 16,
    },

    text: {
        // position: "absolute",
    },

    imgWrapper: {
        width: 48,
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto"
    },

    img: {
        width: 24,
        height: 24,
    }

})