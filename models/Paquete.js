const mongoose = require("mongoose");
const paqueteSchema= new mongoose.Schema({
    nombre: String,
    precio: Number,
    fecha: Date, 
    categoria: String,
    descripcion:String,
    cantidadPersonas: Number,
    ubicacion:String,
    stock: Number,
    // cantidadVendidos:[{type: mongoose.Schema.ObjectId, ref: "usuario", cantidad: Number}],
    cantidadVendidos:[{idUsuario: {type: mongoose.Schema.ObjectId , ref: "usuario"}, cantidad: Number}],
    valoracion: [{
        idUsuario:{type:String,required:true},
        valor:{type:Number , required:false, default:0},
    }],
    opiniones: [{
        idUsuario:{type:String,required:true},
        nombreUsuario: {type: String, required:true},
        imagenUsuario: {type:String, required: true},
        comentarioUsuario: {type:String}
    }],
    productos:[{type: mongoose.Schema.ObjectId , ref: "producto"}],
    imagen: String
})

const Paquete= mongoose.model("paquete",paqueteSchema);

module.exports= Paquete;