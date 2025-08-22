import { getCartProductFromLS } from "./getCartProduct";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (Event, id, stock, price) => {
  // const userEmail = localStorage.getItem("currentUserEmail");
  // if (!userEmail) {
  //   showToast("login", id);
  //   return false;
  // }

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return;

  const userEmail = currentUser.email;

  const currentcardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentcardElement.querySelector(".productQuantity");
  const productPrice = currentcardElement.querySelector(".productPrice");

  let quantity = 1;
  let localStoragePrice = 0;

  let localCartProducts = getCartProductFromLS();

  let existingProd = localCartProducts.find((curProd) => curProd.id === id);

  if (existingProd) {
    quantity = existingProd.quantity;
    localStoragePrice = existingProd.price;
  } else {
    localStoragePrice = price;
    price = price;
  }

  if (Event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
      localStoragePrice = price * stock;
    }
  }

  if (Event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  localStoragePrice = price * quantity;
  localStoragePrice = Number(localStoragePrice.toFixed(2));

  let updatedCart = { id, quantity, price: localStoragePrice };

  updatedCart = localCartProducts.map((curProd) => {
    return curProd.id === id ? updatedCart : curProd;
  });

  localStorage.setItem(
    `cartProductLS_${userEmail}`,
    JSON.stringify(updatedCart)
  );

  productQuantity.innerHTML = quantity;
  productPrice.innerHTML = localStoragePrice;

  updateCartProductTotal();
};
