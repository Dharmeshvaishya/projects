import { addToCart } from "./addToCart";
import products from "../api/products.json";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
  if (!products) {
    return false;
  }

  products.forEach((curProd) => {
    const { brand, category, description, id, image, name, price, stock } =
      curProd;

    const productsClone = document.importNode(productTemplate.content, true);
    productsClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

    productsClone.querySelector(".category").textContent = category;
    productsClone.querySelector(".productName").textContent = name;
    // productsClone.querySelector(".productImage").src = image;
    // productsClone.querySelector(".productImage").alt = name;

    const productImage = productsClone.querySelector(".productImage");
    const imageContainer = productsClone.querySelector(".imageContainer");
    productImage.src = image;
    productImage.alt = name;

    const imageLink = document.createElement("a");
    imageLink.href = `./sproducts.html?id=${id}`;
    imageLink.appendChild(productImage.cloneNode(true));
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imageLink);

    productsClone.querySelector(".productStock").textContent = stock;
    productsClone.querySelector(".productDescription").textContent =
      description;
    productsClone.querySelector(".productPrice").textContent = `₹${price}`;
    productsClone.querySelector(".productActualPrice").textContent = `₹${
      price * 4
    }`;

    imageContainer.setAttribute("id", `imageContainer${id}`);

    imageContainer.addEventListener("click", () => {
      window.location.href = `./sproducts.html?id=${id}`;
    });

    productsClone
      .querySelector(".stockElement")
      .addEventListener("click", (Event) => {
        homeQuantityToggle(Event, id, stock);
      });

    productsClone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (Event) => {
        addToCart(Event, id, stock);
      });

    productContainer.append(productsClone);
  });
};
