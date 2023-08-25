const APIURL = "http://localhost:3000/api";

// GET ROUTES

// GET all items
export async function getAllItems() {
  try {
    const response = await fetch(`${APIURL}/items`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET item by ID
export async function getItemById(itemId) {
  try {
    const response = await fetch(`${APIURL}/items/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET user by username
export async function getUserByUsername(username) {
  try {
    const response = await fetch(`${APIURL}/users/username/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET order by userId
export async function getOrderByUserId(userId) {
  try {
    const response = await fetch(`${APIURL}/orders/orderuser/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// POST ROUTES

export async function createNewOrder({ userId, userEmail }) {
  try {
    const response = await fetch(`${APIURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        email: userEmail,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Create Order Error: ${error}`);
  }
}

export async function addItemToOrder({
  itemId,
  userOrderId,
  orderPrice,
  quantity,
}) {
  try {
    const response = await fetch(`${APIURL}/orderitems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId,
        orderId: userOrderId,
        orderPrice,
        qty: quantity,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Add item to order error: ${error}`);
  }
}
