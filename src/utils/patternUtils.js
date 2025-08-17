import { getProgressFromPattern } from "./sqlite";

export default function handleLevelString(difficulty) {
    switch (difficulty) {
        case 0:
            return "Principiante";
        case 1:
            return "Intermedio";
        case 2:
            return "Avanzado"
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