import { StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { createRef, useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";

import Progress from "../src/components/progress";
import AdsHandler from "../src/components/AdsHandler";
import { fetchData } from "../src/utils/data";
import Card from "../src/components/Card";

export default function Category() {

    const params = useLocalSearchParams();
    const { bucket, name } = params;

    const [steps, setSteps] = useState(null);
    const [image, setImage] = useState(null);
    const [routes, setRoutes] = useState([]);

    const [current, setCurrent] = useState(1);

    const [triggerAd, setTriggerAd] = useState(0);
    const adsHandlerRef = createRef();

    // Obtener pasos y rutas de las imagenes
    useEffect(async () => {
        const steps = fetchData(name);
        setSteps(steps);

        await supabase.storage.from("images").list(bucket, {}).then((res) => {
            const arr = res.data.map(item => item.name && item.name);
            setRoutes(arr);
        })
    }, [])

    // Obtener la imagen que debe mostrarse en este instante.
    useEffect(() => {
        const { data } = supabase.storage.from("images").getPublicUrl(`${bucket}/guia-${bucket}-${current}.jpg`);
        if (routes.includes(`guia-${bucket}-${current}.jpg`)) {
            setImage(data.publicUrl);
        } else {
            setImage(null);
        }
    }, [current, routes])

    // Gestión de anuncios
    useEffect(() => {
        if (triggerAd === 4) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        }
    }, [triggerAd])


    return (
        <View style={styles.container}>
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <Stack.Screen options={{ headerShown: false }} />
            <Card name={name} steps={steps} image={image} setTriggerAd={setTriggerAd} setCurrent={setCurrent} />
            {steps && <Progress current={current} qty={steps.length} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "90%",
        alignSelf: "center",
        paddingTop: 24,
        paddingBottom: 12,
    }
})