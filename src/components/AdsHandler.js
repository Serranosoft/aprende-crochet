import React, { forwardRef, useEffect, useImperativeHandle } from "react"
import { useInterstitialAd } from "react-native-google-mobile-ads";
import { intersitialId, intersitialIdIOS } from "../utils/constants";
import { Platform } from "react-native";

const AdsHandler = forwardRef((props, ref) => {

    const {
        isLoaded: isLoadedIntersitial,
        isClosed: isClosedIntersitial,
        load: loadIntersitial,
        show: showIntersitial } = useInterstitialAd(Platform.OS === "android" ? intersitialId : intersitialIdIOS);

    useEffect(() => {
        loadIntersitial();
    }, [loadIntersitial])

    useImperativeHandle(ref, () => ({
        loadIntersitialAd() {
            loadIntersitial();
        },
        showIntersitialAd() {
            showIntersitialAd();
        },
        isClosedIntersitial() {
            return isClosedIntersitial;
        },
        isLoadedIntersitial() {
            return isLoadedIntersitial;
        },
    }))

    useEffect(() => {
        if (isClosedIntersitial) {
            if (props.closedIntersitialCallback) {
                props.closedIntersitialCallback();
            }
        } else {
            loadIntersitial();
        }

    }, [isClosedIntersitial, props.closedIntersitialCallback])


    function showIntersitialAd() {
        if (isLoadedIntersitial) {
            showIntersitial();
        } else {
            loadIntersitial();
        }
    }

    return <></>
})

export default AdsHandler