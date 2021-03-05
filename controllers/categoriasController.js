const Categoria = require("../models/Categoria")

const categoriasController = {
  agregarCategoria: (req, res) => {
    const { nombre, texto, imagen, color } = req.body
    const categoriaAagregar = new Categoria({
      nombre, texto, imagen, color
    })
    categoriaAagregar.save()
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, response: error }))
  },
  todasLasCategorias: (req, res) => {
    Categoria.find()
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, response: error }))
  }
}

module.exports = categoriasController