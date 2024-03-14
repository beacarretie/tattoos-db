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
Este proyecto requería una API funcional conectada a una base de datos con al menos una relación de uno a muchos y una relación de muchos a muchos.

## Sobre el proyecto
Decidí crear una aplicación web para ayudar a los amantes del gimnasio, que les permitiría crear y realizar un seguimiento de nuevas rutinas para sus ejercicios diarios. He visto muchas apps de este estilo pero ninguna que nos permita cambiar tan libremente las rutinas adaptandolas a nuestras necesidades.    

## Stack
Tecnologías utilizadas:
<div align="center">
<a href="https://www.mongodb.com/">
    <img src= "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
 </div>


## Diagrama BD
!['imagen-db'](./images/sampleDb.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` usando estos comandos:
6. ``` $ npm run dev ``` 
7. ...

## Endpoints
<details>
<summary>Endpoints</summary>

- AUTH
    - REGISTER

            POST http://localhost:3000/api/register
        body:
        ``` js
            {
                "user": "David",
                "email": "david@david.com",
                "password": "princes"
            }
        ```

    - LOGIN

            POST http://localhost:3000/api/login  
        body:
        ``` js
            {
                "user": "David",
                "email": "david@david.com",
                "password": "princes"
            }
        ```
- RUTINAS
    - RECUPERAR RUTINAS  

            GET http://localhost:3000/api/rutina

    - ...
</details>
