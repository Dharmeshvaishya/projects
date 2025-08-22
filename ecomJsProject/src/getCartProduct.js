import { updateCartValue } from "./updateCartValue";

export const getCartProductFromLS = () => {
  // let cartProducts = localStorage.getItem("cartProductLS");
  // if (!cartProducts) {
  //   return [];
  // }

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    return [];
  }

  // const userEmail = localStorage.getItem("currentUserEmail");

  // if (!userEmail) {
  //   return [];
  // }

  const userEmail = currentUser.email;

  let cartProducts = localStorage.getItem(`cartProductLS_${userEmail}`);

  if (!cartProducts) {
    return [];
  }

  cartProducts = JSON.parse(cartProducts);

  //update the cart button value
  updateCartValue(cartProducts);

  return cartProducts;
};
