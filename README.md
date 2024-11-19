# Entregable Parcial 2

# Justificacion BD
(Las tablas estan en una imagen llamada Tablas_BD)
Escogeremos la base de datos SQL, la explicación viene a continuación:

## Estructura
- - Me permite trabajar con datos estructurados, lo que nos sirve al utilizar estructuras de información como lo son usuarios, perfiles (Empleador o trabajador, pueden ser ambos), anuncios, etc.
## Manejo de relaciones e Integridad
- - Tomando la parte de datos estructurados, también permite el uso de manejo de relaciones entre tablas a través de las llaves foráneas, lo que nos da mas seguridad al asegurar la integridad de los datos, ya que es muy importante para no generar malentendidos respecto a anuncios, o evitar errores relacionados a los perfiles o usuarios (Ej: no borrar un usuario si aun se conservan sus anuncios).
## Manejo de Consultas Complejas
- - SQL permite hacer consultas complejas, lo que es muy útil, ya que se utilizaran en la búsqueda de anuncios distintos filtros, lo que puede dar complejidad a la búsqueda (Esto puede ser mas complejo o costoso en otras bases de datos).
## Uso de Transacciones
- - Por último, a través de las transacciones de SQL, aseguramos que exista consistencia dentro de los datos al actualizar tablas, como puede suceder en el caso de los cambios en los anuncios, o editar perfiles, añadiéndole que, si se genera algún error, se puede generar un rollback.

# Arreglo (Modificacion necesaria)
Debido a que en la ultima entrega se nos aviso que las paginas no se consideraban como funcionalidades, debimos agregar Funcionalidades, las cuales quedaron de la siguiente manera:

* Publicar Anuncio (el como se implementa es a traves de un boton flotante en home)
* Borrar Anuncio (al entrar en mis publicaciones, Recordar recargar la pagina poque no pudimos solucionar el que no cargara inmediatamente, luego vuelva al home desde el url, al pasar po mis  publicaciones se arruina todo en general)
* Editar Anuncio  (al entrar en mis publicaciones)
* Ver Perfil
* Barra de busqueda 
* Filtrar (La idea es implementar etiquetas)  el como se implementa es a traves de un boton flotante en home
* Editar Perfil  (opcion que aparece en mi perfil) 

# Aplicacion Patrones
En cuanto a Patronesde diseño, terminamos implementando drawer y tabbar, otro punto es que agregamos en algunos puntos la flecha de back
# Lectura JSON
Por ultimo, el caso de la lectura JSON se hace en el perfil, donde al meterse a mi perfil, se mostraran datos basicos que se leen desde un JSON que se encuentra en la carpeta public


# Detalles y Advertencias para el Uso
- - Otra cosa a decir, es que tuvimos problemas con la parte de mis publicaciones, donde no se abre correctamente, pero al recargar si aparece
- - Para avanzar desde el inicio, debe ingresar los siguientes datos en el inicio de sesion: usuario@ejemplo.com      ;   password: 123456
