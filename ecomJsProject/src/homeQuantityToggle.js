export const homeQuantityToggle = (Event, id, stock) => {
  const currentcardElement = document.querySelector(`#card${id}`);
  // console.log(currentcardElement);

  const productQuantity = currentcardElement.querySelector(".productQuantity");

  let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

  if (Event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
    }
  }

  if (Event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  productQuantity.innerText = quantity;
  productQuantity.setAttribute("data-quantity", quantity);
  return quantity;
};
