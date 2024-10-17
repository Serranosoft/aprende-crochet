import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ui } from "../utils/styles";

export default function Button({ icon, text, onClick, disabled }) {
    return (
        <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={onClick} disabled={disabled}>
            {icon}
            <Text style={[ui.h4, styles.buttonText]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#466090",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,

        shadowColor: "#efedff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    buttonText: {
        marginBottom: -4,
        color: "#fff",
    },

    disabled: {
        backgroundColor: "#777586"
    }
})