# MUY IMPORTANTE !!!

<p>Ver primero los pasos de este readme antes de correr el FRONT</p>

En la terminal, asegurarse de estar posicionado en la carpeta /moviepop/moviepop-api

1- Crear un archivo .env y copiar el contenido de .env.example en este <br>
2- Poner las credenciales de la base de datos local para poder iniciar la misma <br>
3- en TOKEN_SECRET poner un string aleatorio <br>

<h3>Correr el comando:</h3>
<code>npm install</code>

<hr>

### Una vez instaladas las dependencias ejecutar los siguientes comandos:

<p><code>npx sequelize-cli db:create</code> --> <span>Para crear la base de datos con el nombre especificado en el archivo .env</span></p>
<p><code>npx sequelize-cli db:migrate</code> --> <span>Esto creará las tablas en la base de datos</span><p>

## Una vez realizados todos los pasos de manera secuencial, estamos listos para iniciar el proyecto
<code>npm start</code>

### **no cambiar el puerto donde se levanta el servidor**