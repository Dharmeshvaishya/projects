// import { showSingleProduct } from "./sproductDetails.js";
import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";
import { showToast } from "./showToast";

export const showSingleProduct = async () => {
  const container = document.querySelector("#singleProductContainer");
  const template = document.querySelector("#singleProductTemplate");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch("./api/products.json");
    const data = await response.json();

    const product = data.find((item) => item.id === Number(productId));

    if (!product) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }

    const clone = document.importNode(template.content, true);
    clone.querySelector(".product-details").id = `card${product.id}`;

    clone.querySelector(".single-product-image").src = product.image;
    clone.querySelector(".single-product-image").alt = product.name;
    clone.querySelector(".productName").textContent = product.name;
    clone.querySelector(".productCategory").textContent = product.category;
    clone.querySelector(".productDescription").textContent =
      product.description;
    clone.querySelector(".productPrice").textContent = `₹${product.price}`;
    clone.querySelector(".productStock").textContent = product.stock;

    clone.querySelector(".stockElement").addEventListener("click", (Event) => {
      homeQuantityToggle(Event, product.id, product.stock);
    });

    const quantityElem = clone.querySelector(".productQuantity");
    const price = product.price;

    clone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (Event) => {
        const quantity = Number(quantityElem.textContent);
        addToCart(Event, product.id, product.stock, quantity, price);
      });

    container.appendChild(clone);
  } catch (error) {
    console.error("Error loading product:", error);
    container.innerHTML = "<p>Error loading product details.</p>";
  }

  //  showToast("add", id);
};
