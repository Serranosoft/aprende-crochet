export default function handleLevelString(difficulty) {
    switch(difficulty) {
        case 0:
            return "Principiante";
        case 1:
            return "Intermedio";
        case 2:
            return "Avanzado"
    }
}