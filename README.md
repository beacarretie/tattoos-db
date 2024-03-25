# Studio Tattoos Backend database

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    
  </ol>
</details>

## Objetivo
Desde el departamento de producto nos piden crear el backend
correspondiente al sistema de gestión de citas para un estudio de tatuajes.
Para ello el cliente deberá ser capaz de registrarse en la aplicación, hacer
login y acceder a su área de cliente, todo ello visualmente desde el navegador. En
su área de cliente deberá poder ver una lista de las citas para sesiones de tattoo /
piercing que tiene a futuro, podrá crear citas con tatuadores y cada tatuador tendrá
un portfolio de tatuajes(galeria?), modificarlas y anularlas.
También existirá una zona de usuario con sus datos personales, que solo
podrá ver él mismo.
## Sobre el proyecto
Teniendo en cuenta los requisitos, llegamos a la conclusión de que este sería
el mínimo de endpoints convenientes:

1. Registro de usuarios.
2. Login de usuarios.
3. Perfil de usuario.
4. Modificación de datos del perfil.
5. Creación de citas.
6. Editar citas.
7. Eliminación de citas
8. Ver todas las citas que tengo como cliente (solo las propias).
9. Ver todas las citas existentes conmigo (role tatuador).
10. Listar tatuadores
11. Ver todos los clientes registrados (super admin) (EXTRA)
12. Crear tatuadores (superadmin) (EXTRA)
13. Ver todos los clientes registrados (super admin) (EXTRA)
14. Eliminar usuario del sistema(super admin ) (EXTRA)
15. Ver una cita en detalle (EXTRA).
16. El super_admin debe otorgar roles a los usuarios del sistema(EXTRA)
17. Validar la fecha de la cita(EXTRA)
18. Añadir tipos de intervención (tattoo / piercing ) a las citas (EXTRA)
## Stack
1. Para el desarrollo del backend se utilizará TypeOrm.
2. Debemos usar ES6 o TS, se valorará el dominio sobre las promesas, así como
la funcionalidad de async/await.
3. El proyecto se subirá a un repositorio público de GitHub y se valorará la existencia de ramas o trabajo en features (Git Flow), así como diversos
commits con la evolución del proyecto.

## Endpoints
<details>
<summary>Endpoints</summary>

- AUTH

    - Login de usuarios.

            POST http://localhost:3000/api/auth/login  
        body:
        ``` js
            {
                "email": "pepito@tattoostudio.com",
                "password": "87654321"
            }
        ```
    
- APPOINTMENTS

    - Creación de citas.
    
            POST http://localhost:3000/api/appointments/create
        
        body:
        ```js
            {
                "day_date": "2024-08-03T15:48:02.000Z",
	            "description": "Lorem ipsum.",
	            "artist":5,
	            "client":9,
	            "price": 9734
                
            }
    - Ver todas las citas que tengo como cliente (solo las propias).
        
            GET http://localhost:3000/api/appointments/client/appointment

    - Eliminación de citas
    
            DELETE http://localhost:3000/api/appointments/2
    
    - Editar citas.
    
            PUT http://localhost:3000/api/appointments/3

        body:
        ```js
            {
                "day_date": "2024-08-03T15:48:02.000Z",
	            "description": "Lorem ipsum.",
	            "artist":5,
	            "client":9,
	            "price": 9734
                
            }

    - Ver todas las citas existentes conmigo (role tatuador).
    
            GET http://localhost:3000/api/appointments/artist/appointment


- USER

    - Registro de usuarios.

            POST http://localhost:3000/api/users/create
        body:
        ``` js
            {
		         "firstName": "artist bea",
		         "email": "artistbea51@gmail.com",
		         "password": "12345678",
		         "role": "ARTIST"
            }
        ```
    
    - Perfil de usuario.
            
            GET http://localhost:3000/api/users/profile/
    

    - Modificación de datos del perfil.
    
            PUT http://localhost:3000/api/users/profile/update

         body:
        ```js
            {
	                  "id": 80,
	                  "firstName": "beaTRIZ",
	                  "lastName": null,
	                  "email": "bcarre@gmail.com",
                      "phone": null,
	                  "isActive": true,
                      "name": "client"
            }

- ADMIN
    
    - Listar tatuadores
            
            GET http://localhost:3000/api/artists
        ```

</details>
