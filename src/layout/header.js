import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ui } from "../utils/styles";
import { router } from "expo-router";
import { Menu, MenuItem } from "react-native-material-menu";
import { useContext, useState } from "react";
import { LangContext } from "../utils/Context";

export default function Header({ title, back, settings, overlay }) {

    const { language } = useContext(LangContext);

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    return (
        <View style={styles.header}>

            <View style={styles.wrapper}>

                {back &&
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image style={styles.back} source={require("../../assets/back-dark.png")} />
                    </TouchableOpacity>
                }
                <Text style={[ui.h3, { fontFamily: "ancizar-bold" }]}>{title ? title : ""}</Text>
                {
                    settings &&
                    <Menu
                        visible={visible}
                        style={{ maxWidth: 150 }}
                        onRequestClose={hideMenu}
                        anchor={(
                            <TouchableWithoutFeedback onPress={showMenu}>
                                <Image source={require("../../assets/more.png")} style={styles.img} />
                            </TouchableWithoutFeedback>
                        )}>
                        <MenuItem onPress={() => {
                            router.push("settings");
                            hideMenu();
                        }}>
                            <View style={styles.row}>
                                <Image style={styles.icon} source={require("../../assets/settings.png")} />
                                <Text style={ui.text}>{language.t("_settingsLabel")}</Text>
                            </View>
                        </MenuItem>
                    </Menu>
                }
            </View>
            {overlay &&
                <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)" }}></View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "relative",
    },
    wrapper: {
        flexDirection: "row",
        gap: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    back: {
        width: 40,
        height: 40,
    },

    img: {
        width: 28,
        height: 28,
    },
    icon: {
        width: 20,
        height: 20,
    }
})