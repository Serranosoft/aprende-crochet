import { translations } from "./localizations";

/* export const categories_raw = [
    {
        name: "Punto cadena",
        steps: 6,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-cadena.jpg",
    },
    {
        name: "Punto enano",
        steps: 5,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-enano.jpg",
    },
    {
        name: "Punto medio alto",
        steps: 9,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-medio.jpg",
    },
    {
        name: "Punto alto",
        steps: 11,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-alto.jpg",
    },
    {
        name: "Punto bajo",
        steps: 8,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-bajo.jpg",
    },
    {
        name: "Punto alto doble",
        steps: 14,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-alto-doble.jpg",
    }
] */

export function fetchTutorials(acronym) {
    return [
        {
            title: translations[acronym]["Punto_cadena_Title"],
            name: "Punto cadena",
            steps: 6,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-cadena.jpg",
        },
        {
            title: translations[acronym]["Punto_enano_Title"],
            name: "Punto enano",
            steps: 5,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-enano.jpg",
        },
        {
            title: translations[acronym]["Punto_medio_alto_Title"],
            name: "Punto medio alto",
            steps: 9,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-medio.jpg",
        },
        {
            title: translations[acronym]["Punto_alto_Title"],
            name: "Punto alto",
            steps: 11,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-alto.jpg",
        },
        {
            title: translations[acronym]["Punto_bajo_Title"],
            name: "Punto bajo",
            steps: 8,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-bajo.jpg",
        },
        {
            title: translations[acronym]["Punto_alto_doble_Title"],
            name: "Punto alto doble",
            steps: 14,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/punto-alto-doble.jpg",
        }
    ]
}

export function fetchDesigns(acronym) {
    return [
        {
            title: translations[acronym]["Anillo_base_Title"],
            name: "Anillo base",
            steps: 3,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/anillo-base.jpg",
        },
        {
            title: translations[acronym]["Bolso_Cruzado_Title"],
            name: "Bolso Cruzado",
            steps: 9,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/bolso-cruzado.jpg",
        },
        {
            title: translations[acronym]["Bolso_redondo_Title"],
            name: "Bolso redondo",
            steps: 12,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/bolso-redondo.jpg",
        },
        {
            title: translations[acronym]["Manta_bebe_oveja_Title"],
            name: "Manta bebe oveja",
            steps: 31,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/manta-oveja-bebe.jpg",
        },
        {
            title: translations[acronym]["Vestido_niña_Title"],
            name: "Vestido niña",
            steps: 18,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/vestido-nina.jpg",
        },
        {
            title: translations[acronym]["Pulsera_trapillo_Title"],
            name: "Pulsera trapillo",
            steps: 7,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/pulsera-trapillo.jpg",
        },
        {
            title: translations[acronym]["Cesta_trapillo_Title"],
            name: "Cesta trapillo",
            steps: 5,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/cesta-trapillo.jpg",
        },
        {
            title: translations[acronym]["Bola_navidad_Title"],
            name: "Bola navidad",
            steps: 10,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/bola-navidad.jpg",
        },
        {
            title: translations[acronym]["Boina_Title"],
            name: "Boina",
            steps: 10,
            image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/boina.jpg",
        }
    ]
}

export function fetchData(category, acronym) {
    switch (category.replace(/\s/g, "_")) {
        case "Punto_cadena":
            return translations[acronym]["Punto_cadena"];
        case "Punto_bajo":
            return translations[acronym]["Punto_bajo"];
        case "Punto_enano":
            return translations[acronym]["Punto_enano"];
        case "Anillo_base":
            return translations[acronym]["Anillo_base"];
        case "Punto_alto":
            return translations[acronym]["Punto_alto"];
        case "Punto_medio_alto":
            return translations[acronym]["Punto_medio_alto"];
        case "Punto_alto_doble":
            return translations[acronym]["Punto_alto_doble"];
        case "Manta_bebe_oveja":
            return translations[acronym]["Manta_bebe_oveja"];
        case "Vestido_niña":
            return translations[acronym]["Vestido_nina"];
        case "Pulsera_trapillo":
            return translations[acronym]["Pulsera_trapillo"];
        case "Cesta_trapillo":
            return translations[acronym]["Cesta_trapillo"];
        case "Bola_navidad":
            return translations[acronym]["Bola_navidad"];
        case "Boina":
            return translations[acronym]["Boina"];
        default:
            return [];
    }
}

export async function fetchImages(category, length) {
    const images = [];
    let result = "";

    const urlSegment = "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/10/guia-"
    const pattern = category.replace(/ /g, '-').toLowerCase();

    for (let i = 1; i <= length; i++) {
        result = urlSegment + pattern + "-" + i + ".jpg"
        images.push(result);
    }

    return images;
}