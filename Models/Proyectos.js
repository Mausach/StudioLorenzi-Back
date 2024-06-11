const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Definir el modelo de Usuario
const Proyectos = sequelize.define('Proyectos', {

    proyectId: {//id
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    companyName: {//nombre de empresa
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {//direccion
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    task: {//tarea
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    taskDescription: {//descripcion de tarea
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    formDate: {//fecha de inicio
        type: DataTypes.DATE,
        allowNull: false,
        
    },
    untilDate: {//fecha de fin
        type: DataTypes.DATE,
        allowNull: false,
        
    },
    madeDate: {//fecha de captura
        type: DataTypes.DATE,
        allowNull: false,
        
    },
    resposiblePerson: {//persona responsable
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    weekDuration: {//semana de duracion
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    hourDuration: {//horas de duracion
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    costs: {//costo
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    costsGoogle: {//costos de google
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    
    clientId: {//id del cliente que pidio el proyecto
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {//archivado o no
        type: DataTypes.BOOLEAN,
        defaultValue: false
        
    },
});



module.exports = Proyectos;