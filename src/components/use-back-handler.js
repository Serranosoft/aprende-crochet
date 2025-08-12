import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(handler) {
    useEffect(() => {
        const backhandler = BackHandler.addEventListener("hardwareBackPress", handler);

        return () => backhandler.remove();
    }, [handler]);
}