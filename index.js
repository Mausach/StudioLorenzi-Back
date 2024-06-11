const express = require('express')
const sequelize = require('./db/config');
require('dotenv').config();
const cors= require("cors");
const app= express();

//llamar al servidor
app.listen(process.env.PORT, ()=>{
    console.log(`server corriendo en ${process.env.PORT}`)
})


// Prueba de conexión a la base de datos
sequelize
.authenticate()
.then(() => {
  console.log('Conexión a la base de datos establecida con éxito.');
})
.catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
  
});

// Sincroniza tus modelos con la base de datos para que las 7ablas que no exis7en se creen
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada con éxito.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  })
  

//cors
app.use(cors());

//directorio publico
app.use(express.static('public'));

// Middleware para parsear JSON
//lectura y parseo del body
app.use(express.json());

//para los estudios contables o usuarios en general
app.use("/auth",require('./Routes/auth'))

//para el admin
app.use("/admin",require('./Routes/admin'))

