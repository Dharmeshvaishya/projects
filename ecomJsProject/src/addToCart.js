import { getCartProductFromLS } from "./getCartProduct";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

//get the data from localstorage
getCartProductFromLS();

// to add the data into LocalStorage
export const addToCart = (Event, id, stock) => {
  // const userEmail = localStorage.getItem("currentUserEmail");
  // if (!userEmail) {
  //   showToast("login", id);
  //   return false;
  // }

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return;

  const userEmail = currentUser.email;

  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProductElem = document.querySelector(`#card${id}`);
  let quantity = currentProductElem.querySelector(".productQuantity").innerText;
  let price = currentProductElem.querySelector(".productPrice").innerText;

  // console.log(quantity, price);

  price = price.replace("₹", "");

  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );

  if (existingProd && quantity > 1) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price = Number(price * quantity);

    let updatedCart = { id, quantity, price };

    updatedCart = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });

    localStorage.setItem(
      `cartProductLS_${userEmail}`,
      JSON.stringify(updatedCart)
    );

    showToast("add", id);
    updateCartValue(updatedCart);
    return true;
  }

  if (existingProd) {
    return false;
  }

  price = Number(price * quantity);
  quantity = Number(quantity);

  arrLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem(
    `cartProductLS_${userEmail}`,
    JSON.stringify(arrLocalStorageProduct)
  );

  //update the cart button value
  updateCartValue(arrLocalStorageProduct);

  showToast("add", id);
};
