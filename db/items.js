/* eslint-disable */
import { client } from "./client.js";

async function createItem({ title, price, inventory, image_name }) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            INSERT INTO items
            (title, price, inventory, image_name)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
      [title, price, inventory, image_name]
    );

    return item;
  } catch (error) {
    throw error;
  }
}

async function updateItem({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [item],
    } = await client.query(
      `
            UPDATE items
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            
            `,
      Object.values(fields)
    );

    return item;
  } catch (error) {
    throw error;
  }
}

async function getAllItems() {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM items
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getItemById(id) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            SELECT *
            FROM items
            WHERE id = $1; 
            `,
      [id]
    );

    return item;
  } catch (error) {
    throw error;
  }
}

async function getItemByTitle(title) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            SELECT *
            FROM items
            WHERE title = $1;
            `,
      [title]
    );

    return item;
  } catch (error) {
    throw error;
  }
}

async function getItemByCategory(categoryId) {
  try {
    const { rows } = await client.query(
      `
            SELECT items.*
            FROM items
            JOIN item_category ON items.id = item_category."item_id"
            WHERE item_category."category_id" = $1;  
            `,
      [categoryId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function attachItemToOrder({ itemId, orderId, price, qty }) {
  console.log('ORDER_ITEM: ', qty)
  try {
    const { rows } = await client.query(
      `
            INSERT INTO ordered_items
            ("itemId", "orderId", price, qty) 
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
      [itemId, orderId, price, qty]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function removeItemFromOrder({ itemId, orderId }) {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM ordered_items
            WHERE "itemId" = $1 AND "orderId" = $2
            RETURNING *;
            `,
      [itemId, orderId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function attachItemToCategory({ itemId, categoryId }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO item_category
            ("item_id", "category_id")
            VALUES ($1, $2)
            RETURNING *;  
            `,
      [itemId, categoryId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function removeItemFromCategory({ itemId, categoryId }) {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM item_category
            WHERE "item_id" = $1 AND "category_id" = $2
            RETURNING *; 
            `,
      [itemId, categoryId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteItem(itemId) {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM items
      WHERE id = $1; 
      `,
      [itemId]
    );
  } catch (error) {
    throw error;
  }
}

export {
  createItem,
  updateItem,
  getAllItems,
  attachItemToOrder,
  removeItemFromOrder,
  getItemById,
  getItemByTitle,
  getItemByCategory,
  attachItemToCategory,
  removeItemFromCategory,
  deleteItem,
};
