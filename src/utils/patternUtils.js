import { useContext } from "react";
import { getProgressFromPattern } from "./sqlite";
import { LangContext } from "./Context";

export default function handleLevelString(difficulty, language) {

    switch (difficulty) {
        case 0:
            return language.t("_metadataBeginner");
        case 1:
            return language.t("_metadataIntermediate");
        case 2:
            return language.t("_metadataAdvanced");
    }
}

// Añadir a cada item  la propiedad con el current del progreso
export async function handleProgress(patterns) {
    const updated = await Promise.all(
        patterns.map(async (pattern) => {
            const x = await getProgressFromPattern(pattern.id);
            return { ...pattern, progress: x !== null ? x.progress : x };
        })
    );
    return updated;
}