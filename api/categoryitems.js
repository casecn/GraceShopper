import express from "express";
const itemCategoryRouter = express.Router();
import {
  attachItemToCategory,
  removeItemFromCategory,
  itemInCategory,
} from "./db/items.js";

// POST ROUTES

// POST /api/categoryitems - Add item to category.
itemCategoryRouter.post("/", async (req, res, next) => {
  const { itemId, categoryId } = req.body;

  const itemAlreadyInCategory = await itemInCategory({ itemId, categoryId });

  if (!itemAlreadyInCategory) {
    try {
      const newItem = await attachItemToCategory({ itemId, categoryId, });

      res.send(newItem);
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "Item in Category",
      message: `This item already exisits in this category`,
    });
  }
});

// Delete ROUTES

// DELETE /api/categoryitems/
// DELETE /api/categories/:categoryId - Delete a category by ID
itemCategoryRouter.delete("/:itemID/:categoryID", async (req, res, next) => {
  const { itemId, categoryId  } = req.params;

  try {
    const deletedItemCategory = await removeItemFromCategory(itemId, categoryId);

    res.send(deletedItemCategory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { itemCategoryRouter };