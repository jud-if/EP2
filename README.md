# Entrega FINAL

# IMPORTANTE PARA CORRER PROYECTO:
Esta es una falla que no pudimos resolver, pero que ocurre solo la primera vez que se abre la aplicación, aquí se especifica lo que sucede:
* Al abrir la aplicación por primera vez, e iniciar sesión, redirige al Home correctamente, pero se ve en blanco, y en el drawer (menu lateral), todas las opciones llevan hacia el inicio de sesión nuevamente, exceptuando por el Cerrar Sesión, el cual devuelve hacia la primera página de Bienvenida correctamente, además de borrar la cookie.
* Cuando pase esto, hay que reiniciar primero el servidor de backend, y luego reiniciar el servidor de Ionic, y entonces se puede usar la aplicación correctamente.

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
En cuanto a Patrones de diseño, terminamos implementando drawer y tabbar, otro punto es que agregamos en algunos puntos la flecha de back
