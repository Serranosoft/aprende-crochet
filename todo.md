## Eliminar las siguientes variables del fichero traducción que ya no se usan
- _designsTitle
- _designsSubtitle
- _homeSteps


## Mejoras  
- Añadir zoom a las imagenes
- Añadir modal de actualizaciones
- Crear la pantalla designs similar a patterns que consuma del json designs.
- Crear la pantalla de mis patrones en curso listando de la matriz [designs, stitchings] junto con la tabla my_progress
- Al pulsar en siguiente o anterior se debe ejecutar la acción de pasar a la anterior o al siguiente paso.
- Añadir paddingBottom al innerList del flatlist de la lista de patrones
- En Steps, el botón Siguiente debe mostrar un mensaje "He terminado" que registre que este diseño o patrón ha sido finalizado. Al pulsar
se registra en base de datos como is_Finished y te devuelve a la pantalla anterior.
- Persistir contador de hilos