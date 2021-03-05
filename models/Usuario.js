const mongoose=require("mongoose")

const usuarioSchema= new mongoose.Schema({
    nombre: String,
    apellido: String,
    cuenta:String ,
    password: String,
    imagen: {type:String , default:"no-usuario.png"},
    googleUser: String,    
    rol: {type: String , default: "registrado"},
    paquetesFaveados:[{type: mongoose.Schema.ObjectId , ref: "paquete",default: []}],
    paquetesComprados:[{
        idPaquete:{type: mongoose.Schema.ObjectId , ref: "paquete"},
        cantidad: Number
    }]
})

const Usuario=mongoose.model("usuario",usuarioSchema);

module.exports=Usuario;