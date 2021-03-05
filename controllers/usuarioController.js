const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')

const usuarioController = {
    eliminarUsuario: async(req, res) =>{
        await Usuario.findOneAndDelete(req.params)
        .then(()=>{return res.json({success: true, response:'Usuario Borrado'})})
        .catch(error =>{return res.json({success:false, response: 'Error al eliminar usuario'})})
    },
    unUsuario: async (req,res) =>{
        await Usuario.find(req.params) 
        .then(unUsuario => res.json({success:true, response:unUsuario})) 
        .catch(errors => res.json({succes:false, errors}))
    },
    login: async (req,res)=>{
        var errors=[]
        const {cuenta,password}=req.body;
        const usuarioExistente = await Usuario.findOne({cuenta});
        if(!usuarioExistente){errors.push("Cuenta o contraseña incorrecta")}
        else if (usuarioExistente){
            const passwordMatches= bcryptjs.compareSync(password,usuarioExistente.password);
            if(!passwordMatches){errors.push("Cuenta o contraseña incorrecta");}
            var token=jsonWebToken.sign({...usuarioExistente},process.env.JWT_SECRET_KEY,{});
        }
        return res.json({
            success: errors.length===0? true:false,
            errors: errors,
            response: errors.length===0 && {token,id: usuarioExistente._id, nombre:usuarioExistente.nombre,
                apellido:usuarioExistente.apellido,imagen:usuarioExistente.imagen,rol:usuarioExistente.rol
                ,googleUser:usuarioExistente.googleUser}
        })
    },
    editarUsuario: async(req,res) =>{
        const {imgFile}= req.files

        const imgTipo=imgFile.name.split(".").slice(-1).join(" ")
        const {cuenta,password,nombre,apellido}=req.body
        var imgName= `${req.params}.${imgTipo}`
        
        await Usuario.findOneAndUpdate(
            req.params,
            {'$set':{cuenta,password,nombre,apellido,imgName}},
            {new:true})
        
        .then(()=>{return res.json({success: true, response:'Usuario Editado'})})
        .catch(error =>{return res.json({success:false, response: 'Error al editar Usuario'})})
    },
    agregarUsuario: async (req,res)=>{
        var errors=[];
        console.log(req.files)
        console.log("PRINCIPIO")
        const {cuenta,password,nombre,apellido,rol,googleUser,productosFaveados,productosComprados,googlePic}=req.body;
        const usuarioExiste = await Usuario.findOne({cuenta})
        if(usuarioExiste){errors.push("El usuario ya existe. Eliga otro por favor!")
        }else{
            const hashedPassword =  bcryptjs.hashSync(password, 10)
            var nuevoUsuario= new Usuario({cuenta,password:hashedPassword,nombre,apellido,rol,googleUser,productosFaveados,productosComprados})

            console.log(nuevoUsuario)
            if(googleUser==="false"){
                console.log("CUENTA NORMAL")
                const {imgFile}= req.files;
                
                const imgTipo= imgFile.name.split(".").slice(-1).join(" ");
                console.log(imgFile)
                console.log(imgTipo)
                var imgName= `${nuevoUsuario._id}.${imgTipo}`
                var imgPath= `${__dirname}/../frontend/public/usuarioImg/${nuevoUsuario._id}.${imgTipo}`
                
                await imgFile.mv(imgPath,error=>{
                    if(error){
                        errors.push(error)}
                        else{
                            
                        }})
                        nuevoUsuario.imagen = googlePic;
            }
            else{
                
                console.log("CUENTA GOOGLE")
                nuevoUsuario.imagen = req.body.imgFile
            }
            }
            if(errors.length===0){
                const nuevoUsuarioGuardado = await nuevoUsuario.save()
                var token= jsonWebToken.sign({...nuevoUsuarioGuardado},process.env.JWT_SECRET_KEY,{})
            }        
            console.log(errors)
            return res.json({
                success: errors.length===0 ? true : false,
                errors: errors,
                response: errors.length===0 && {token,id: nuevoUsuario._id, nombre,apellido,imagen:nuevoUsuario.imagen,rol,googleUser}
        })

    },  
    todosLosUsuarios : (req, res)=>{
        Usuario.find()
        .then(usuarios =>{
            return res.json({success: true, response:usuarios})
        })
        .catch(error =>{
            return res.json({success:false, response:error})
        })
    },

    logFromLS: (req, res) => {
        res.json({success: true,
          response: {
            token: req.body.token,
            nombre: req.user.nombre,
            imagen: req.user.imagen,
            googleUser: req.user.googleUser
          },
        });
      },
}
module.exports= usuarioController;