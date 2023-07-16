import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import { ui } from "../src/utils/styles";
import { useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";
import LottieView from 'lottie-react-native';
import { Image } from 'expo-image';

export default function App() {

    const [categories, setCategories] = useState([]);

    async function fetchName() {
        const { data } = await supabase.from("Categories").select("id, name, steps, bucket, image");
        setCategories(data);
    }

    useEffect(() => {
        fetchName();
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: "#5193F0" }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={[ui.title, { marginTop: 40, textAlign: "center", lineHeight: 45 }]}>Aprende crochet paso a paso</Text>

            {
                categories.length > 0 ?
                    <View style={{flex: 1, gap: 100 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 60, }}>
                            <LottieView source={require("../assets/lottie/crochet.json")} loop={true} autoPlay={true} style={{ width: "100%", aspectRatio: 1 }} />
                        </View>
                        <FlatList
                            data={categories}
                            numColumns={2}
                            renderItem={({ item, i }) => {
                                return (
                                    <TouchableOpacity style={ui.categoryTouch} key={i}>
                                        <Link href={{ pathname: "/category", params: { id: item.id, bucket: item.bucket, name: item.name } }}>
                                            <View>
                                                <Image
                                                    style={{aspectRatio: 1, width: 100, height: 100,}}
                                                    source={item.image}
                                                />
                                                <Text style={ui.text}>{item.name}</Text>
                                                <Text style={ui.muted}>{item.steps} pasos</Text>
                                            </View>
                                        </Link>
                                    </TouchableOpacity>
                                )
                            }}

                        />
                    </View>
                    :
                    <LottieView source={require("../assets/lottie/loading-animation.json")} loop={true} autoPlay={true} />
            }
        </View>
    )
}