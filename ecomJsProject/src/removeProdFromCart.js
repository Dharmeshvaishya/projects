import { getCartProductFromLS } from "./getCartProduct";
import { showToast } from "./showToast";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    showToast("login", id);
    return false;
  }

  const userEmail = currentUser.email;

  let cartProducts = getCartProductFromLS();
  cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

  localStorage.setItem(
    `cartProductLS_${userEmail}`,
    JSON.stringify(cartProducts)
  );

  // to remove the div on click
  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();
    showToast("delete", id);
  }

  updateCartValue(cartProducts);

  updateCartProductTotal();
};
