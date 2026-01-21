import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

/**
 * Vista de productos con paginación
 */
router.get("/products", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    let filter = {};
    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    res.render("index", {
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/products?page=${page + 1}` : null
    });

  } catch (error) {
    res.send("Error al cargar productos");
  }
});


/**
 * Vista detalle de producto
 */
router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await ProductModel.findById(pid).lean();

    if (!product) {
      return res.send("Producto no encontrado");
    }

    res.render("productDetail", {
      product
    });

  } catch (error) {
    res.send("Error al cargar producto");
  }
});

/**
 * Vista de carrito
 */
router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid)
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.send("Carrito no encontrado");
    }

    res.render("cart", {
      products: cart.products
    });

  } catch (error) {
    res.send("Error al cargar carrito");
  }
});



export default router;
