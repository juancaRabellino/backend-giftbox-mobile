const express = require("express");
const router = express.Router();
const validador = require("../controllers/validador");
const passport = require("passport");
require("../config/passport");

const productosController = require("../controllers/productosController");
const usuarioController = require("../controllers/usuarioController");
const paquetesController = require("../controllers/paquetesController");
const categoriasController = require("../controllers/categoriasController");


// CONTROLADORES DE PRODUCTO 
router.route("/productos")
  .post(productosController.agregarProducto)
  .get(productosController.todosLosProductos);

router.route("/productos/:_id")
  .get(productosController.unProducto)
  .delete(productosController.eliminarProducto)
  .put(productosController.editarProducto)
router.route("/productos/paquete/:_id")
  .get(productosController.productosPorPaquete)
// CONTROLADORES DE PAQUETES 

router.route("/paquetes")
  .post(paquetesController.agregarPaquete)
  .get(paquetesController.todosLosPaquetes)

router.route("/paquetes/:_id")
  .get(paquetesController.unPaquete)
  .delete(paquetesController.eliminarPaquete)
  .put(paquetesController.editarPaquete)

// CONTROLADOR DE USUARIO
router.route('/usuarios/:_id')
  .delete(usuarioController.eliminarUsuario)
  .put(usuarioController.editarUsuarioPass)
  .get(usuarioController.unUsuario)
router.route("/usuarios")
  // .post(validador.validarNuevaCuenta, usuarioController.agregarUsuario)
  .post(usuarioController.agregarUsuario)
  .get(usuarioController.todosLosUsuarios)
router.route("/login")
  .post(usuarioController.login)
router.route('/imagen/:_id')
  .put(usuarioController.editarUsuarioImg)
  

  router.route('/usuarios/ls')
.post(passport.authenticate('jwt', {session: false}), usuarioController.logFromLS)

// CONTROLADOR DE CATEGORIAS
router.route('/categoria')
  .post(categoriasController.agregarCategoria)
router.route('/categorias')
  .get(categoriasController.todasLasCategorias)
module.exports = router;
