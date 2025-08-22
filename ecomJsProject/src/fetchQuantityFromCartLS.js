import { getCartProductFromLS } from "./getCartProduct";

export const fetchQuantityFromCartLS = (id, price) => {
  const userEmail = localStorage.getItem("currentUserEmail");
  if (!userEmail) {
    return { quantity: 1, price: 0 };
  }
  
  let cartProducts = getCartProductFromLS();

  let existingProduct = cartProducts.find((curProd) => curProd.id === id);
  let quantity = 1;

  if (existingProduct) {
    quantity = existingProduct.quantity;
    price = existingProduct.price;
  }
  return { quantity, price };
};
