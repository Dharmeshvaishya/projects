import "./style.css";
import products from "../api/products.json";
import { showProductContainer } from "./homeProductCards";
// import { showSingleProduct } from "./sproductDetails";

// Define a function named `showProductConatainer` that takes an array of products as input.

showProductContainer(products);
// showSingleProduct();

// console.log("products", products);

// document.addEventListener("DOMContentLoaded", () => {
//   const cardsection = document.querySelector("#card-section");

//   if (!cardsection) {
//     console.error("cardsection not found");
//     return;
//   }

//   products?.forEach((item, index) => {
//     let anchor = document.createElement("a");
//     let img = document.createElement("img");
//     anchor.href = `./sproducts.html?id=${item.id}`;
//     img.src = item.image;
//     img.alt = item.name;
//     img.className = "productImage";
//     anchor.appendChild(img);
//     cardsection.appendChild(anchor);
//   });
// });
