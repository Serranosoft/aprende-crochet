const icons = [
    require("../../assets/level1.png"),
    require("../../assets/level2.png"),
    require("../../assets/level3.png")
];

export default function getDifficultyIcon(difficulty) {
    return icons[difficulty] || icons[0];
}
