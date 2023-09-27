const Punto_cadena = ["Tenemos primero en la aguja el primer punto formado con un nudo corredizo.", "Mover el ganchillo de abajo para arriba y engancharlo en la hebra que sostiene el dedo índice izquierdo para hacer una lazada.", "Una vez realizada la lazada deberá pasarse por dentro del punto que sostiene la aguja.", "De ésta manera se pasa la lazada por dentro del punto y el punto que se encontraba en la aguja se deja caer.", "Se ha creado un nuevo punto que se encuentra sostenido por la aguja.", "Repetir desde el paso número 2 hasta tener una cadena del largo deseado.", "En las explicaciones de otros puntos, al comenzar la primera hilera se indica insertar la aguja en un determinado punto cadena desde la aguja, la manera de contarlos es como está representado en el dibujo, no se incluye el nudo corredizo del final ni el punto que sostiene el ganchillo"]
const Punto_enano = ["Se muestra en color más oscuro el segundo punto de la cadena en donde debe insertarse la aguja.", "Insertar la aguja en el 2º punto de la cadena base del tejido.", "Hacer una lazada.", "Pasar la lazada por dentro del punto de la cadena y de la aguja.", "Se continúa con el punto cadena que sigue y se repiten los pasos 1 a 4 tantas veces como sea necesario.", "Al final de las vueltas tejer 1 punto cadena extra para subir y girar la labor."];


export function fetchData(category) {
    switch(category.replace("/\s/g", "_")) {
        case "Punto_cadena":
            return Punto_cadena;
        case "Punto_enano":
            return Punto_enano;
        default:
            return Punto_cadena;
    }
}