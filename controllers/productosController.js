const Producto= require("../models/Producto");
const productoController ={
    agregarProducto: (req, res)=>{
        const {nombre,precio,fecha,categoria,descripcion,cantidadPersonas,ubicacion,cantidadVendidos,valoracion,opiniones,paqueteId}=req.body;
        const productoAagregar = new Producto({
            nombre,precio,fecha,categoria,descripcion,cantidadPersonas,ubicacion,cantidadVendidos,valoracion,opiniones,paqueteId
        })
        productoAagregar.save()

        .then(async nuevoProducto =>{
            const productoPopulado = await nuevoProducto.populate('paqueteId').execPopulate()
            return res.json({success:true, response: productoPopulado})})
        .catch(error=>{return res.json({success:false, error:"Error al cargar el producto"})})
    },
    todosLosProductos: (req,res)=>{
        Producto.find().populate("paqueteId")
        .then(data=>{return res.json({success:true, response:data})})
        .catch(error=>{return res.json({success:false, response:"Error al obtener los productos"})})
    },
    productosPorPaquete: (req, res) => {
        Producto.find({paqueteId : req.params}).populate('paqueteId')
        .then(data => {return res.json({success:true, response:data})})
        .catch(error => {return res.json({succes:false, error:"Error al obtener los productos"})})
    },
    unProducto: (req,res)=>{
        Producto.findOne(req.params)
        .then(data=>{return res.json({success:true, response:data})})
        .catch(error=>{return res.json({success:false, response:"Error al obtener el producto"})})
    },
    eliminarProducto: async (req, res) => {
        Producto.findOneAndDelete(req.params)
        .then(()=>{return res.json({success:true, response: "Producto Borrado"})})
        .catch(error=>{return res.json({success:false, response: "Error al eliminar el producto"})})
    },
    editarProducto: (req,res)=>{
        Producto.findOneAndUpdate(req.params,req.body,{new:true})
        .then(productoActualizado=>res.json({success:true, response: productoActualizado}))
        .catch(error=>res.json({success:false,response:"Error al editar el producto"}))
    }
}
module.exports= productoController;