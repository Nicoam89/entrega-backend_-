import { Router } from "express";
import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";

const router = Router();

/**
 * Crear carrito vacío
 */
router.post("/", async (req, res) => {
  try {
    const newCart = await CartModel.create({ products: [] });
    res.json({
      status: "success",
      payload: newCart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * Ver carrito por id con populate
 */
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid).populate("products.product");

    if (!cart) {
      return res.json({ status: "error", error: "Carrito no encontrado" });
    }

    res.json({
      status: "success",
      payload: cart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * Agregar producto al carrito
 */
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.json({ status: "error", error: "Carrito no encontrado" });
    }

    const product = await ProductModel.findById(pid);
    if (!product) {
      return res.json({ status: "error", error: "Producto no encontrado" });
    }

    const productInCart = cart.products.find(
      p => p.product.toString() === pid
    );

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();

    res.json({
      status: "success",
      payload: cart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * Actualizar carrito completo
 */
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const products = req.body;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = products;
    await cart.save();

    res.json({
      status: "success",
      payload: cart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * Actualizar cantidad de un producto
 */
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.json({ status: "error", error: "Carrito no encontrado" });
    }

    const productInCart = cart.products.find(
      p => p.product.toString() === pid
    );

    if (!productInCart) {
      return res.json({ status: "error", error: "Producto no existe en el carrito" });
    }

    productInCart.quantity = quantity;
    await cart.save();

    res.json({
      status: "success",
      payload: cart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * Eliminar producto del carrito
 */
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter(
      p => p.product.toString() !== pid
    );

    await cart.save();

    res.json({
      status: "success",
      payload: cart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * Vaciar carrito
 */
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = [];
    await cart.save();

    res.json({
      status: "success",
      payload: cart
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

export default router;
