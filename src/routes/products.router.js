import { Router } from "express";
import { ProductModel } from "../models/product.model.js";

const router = Router();

/**
 * GET con paginación, filtros y ordenamiento
 */
router.get("/", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    // Filtro
    let filter = {};
    if (query) {
      // puede ser categoría o status
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    // Ordenamiento
    let sortOption = {};
    if (sort === "asc") {
      sortOption.price = 1;
    } else if (sort === "desc") {
      sortOption.price = -1;
    }

    // Total de productos filtrados
    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}` : null
    });

  } catch (error) {
    res.json({
      status: "error",
      error: error.message
    });
  }
});

/**
 * POST crear producto
 */
router.post("/", async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);

    res.status(201).json({
      status: "success",
      payload: newProduct
    });

  } catch (error) {
    console.log("❌ Error creando producto:", error.message);

    res.status(400).json({
      status: "error",
      error: error.message
    });
  }
});


export default router;
