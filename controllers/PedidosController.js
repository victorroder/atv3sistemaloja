import express from "express";
const router = express.Router();
import Pedido from "../models/Pedido.js";

// Listar Pedidos
router.get("/pedidos", (req, res) => {
  Pedido.findAll().then((pedidos) => {
    res.render("pedidos", { pedidos: pedidos });
  });
});

// Criar Pedido
router.post("/pedidos/new", (req, res) => {
  const { numero, valor } = req.body;
  Pedido.create({ numero, valor }).then(() => {
    res.redirect("/pedidos");
  });
});

// Excluir Pedido
router.get("/pedidos/delete/:id", (req, res) => {
  const id = req.params.id;
  Pedido.destroy({ where: { id: id } })
    .then(() => res.redirect("/pedidos"))
    .catch((error) => console.log(error));
});

// Editar Pedido
router.get("/pedidos/edit/:id", (req, res) => {
  const id = req.params.id;
  Pedido.findByPk(id).then((pedido) => {
    res.render("pedidoEdit", { pedido: pedido });
  });
});

// Atualizar Pedido
router.post("/pedidos/update", (req, res) => {
  const { id, numero, valor } = req.body;
  Pedido.update({ numero, valor }, { where: { id: id } })
    .then(() => res.redirect("/pedidos"))
    .catch((error) => console.log(error));
});

export default router;
