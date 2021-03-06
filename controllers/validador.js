const Joi = require('joi')

const validador = {
    validarNuevaCuenta: (req, res, next) => {
        const schema = Joi.object({
            nombre: Joi.string().trim().required().min(2).message({
                "string.min": "Tu nombre debe contener al menos 2 letras",
            }),
            apellido: Joi.string().trim().required().min(2).message({
                "string.min": "Tu apellido debe contener al menos 2 letras",
            }),
            cuenta: Joi.string().trim().required().email({tlds: {allow: false}}).message({
                "string.email": "Por favor escribe una direccion de correo valida. La misma será utilizada para su cuenta"
            }),
            password: Joi.string().trim().required().pattern(/(?=.*\d)/).min(5).message({
                "string.min": "Tu contraseña debe contener al menos 5 caracteres",
            }),
            imagen: Joi.string().empty(""),
            
        })

        const validacion = schema.validate(req.body, {abortEarly: false})

        if (!validacion.error) {
            next()
        } else {
            res.json({success: false, errores: validacion.error.details})
            
        }
      }
  }
  

  module.exports = validador