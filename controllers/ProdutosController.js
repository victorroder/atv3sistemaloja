import express from "express";
const router = express.Router();
import Produto from "../models/Produto.js";

// Listar Produtos
router.get("/produtos", function (req, res)  {
  Produto.findAll().then((produtos) => {
    res.render("produtos", { produtos: produtos });
  });
});

// Criar Produto
router.post("/produtos/new", (req, res) => {
  const { nome, preco, categoria } = req.body;
  Produto.create({ nome:nome, preco:preco, categoria:categoria }).then(() => {
    res.redirect("/produtos");
  }).catch((error) => {
    console.log(error);
    res.redirect("/produtos");
  });
});

router.get("/produtos/delete/:id", (req, res) => {
  const id = req.params.id;
  Produto.destroy({ where: { id: id } })
    .then(() => res.redirect("/produtos"))
    .catch((error) => console.log(error));
});

// Editar Produto
router.get("/produtos/editar/:id", (req, res) => {
  const id = req.params.id;
  Produto.findByPk(id).then((produto) => {
    res.render("produtoEdit", { produto: produto });
  }).catch((error) => {
    console.log(error);
    res.redirect("/produtos");
  });
});


// Atualizar Produto
router.post("/produtos/update", (req, res) => {
  const { id, nome, preco, categoria } = req.body;
  Produto.update({ nome, preco, categoria }, { where: { id: id } })
    .then(() => res.redirect("/produtos"))
    .catch((error) => {
      console.log(error);
      res.redirect("/produtos");
    });
});

export default router;

