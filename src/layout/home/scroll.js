import { ScrollView, StyleSheet } from "react-native"

export default function Scroll({ children }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.inner} >
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        alignItems: "flex-start",
        gap: 48,
        paddingBottom: 80
    }
})