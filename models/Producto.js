const mongoose = require("mongoose");
const productoSchema= new mongoose.Schema({
    nombre: String,
    precio: Number,
    fecha: {type:Date, default: Date.now}, 
    categoria: String,
    descripcion: String,
    cantidadPersonas: Number,
    ubicacion: String,
    stock: Number,
    cantidadVendidos:[{type: mongoose.Schema.ObjectId , ref: "usuario"}],
    valoracion: [{
        idUsuario:{type:String,required:true},
        valor: Number
    }],
    opiniones: [{
        idUsuario:{type:String,required:true},
        nombreUsuario: {type: String, required:true},
        imagenUsuario: {type:String, required: true},
        opinion: {type:String}
    }],
    paqueteId: {type: mongoose.Schema.ObjectId , ref: "paquete"}
})

const Producto= mongoose.model("producto",productoSchema);

module.exports= Producto;