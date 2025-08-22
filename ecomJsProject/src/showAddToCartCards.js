import products from "../api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromcartLS";
import { getCartProductFromLS } from "./getCartProduct";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

// To update the addToCart

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    const LSActualData = fetchQuantityFromCartLS(id, stock);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent =
      LSActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
      LSActualData.price;

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (Event) => {
        incrementDecrement(Event, id, stock, price);
      });

    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => removeProdFromCart(id));

    cartElement.appendChild(productClone);
  });
};

//showing cartproduct
showCartProduct();

updateCartProductTotal();

//place order button click //

const placeOrderBtn = document.getElementById("placeOrderBtn");
const checkoutSection = document.getElementById("checkoutSection");
const checkoutCartContainer = document.getElementById("checkoutCartContainer");

placeOrderBtn.addEventListener("click", () => {
  if (cartProducts.length === 0) {
    alert("your cart is empty");
    return;
  }

  //hide add to cart section show checkout section
  document.querySelector(".addToCartElement").style.display = "none";
  checkoutSection.style.display = "block";

  //load cart products into checkout summary
  checkoutCartContainer.innerHTML = "";
  filterProducts.forEach((curProd) => {
    const { id, name, image, price, stock } = curProd;

    const LSActualData = fetchQuantityFromCartLS(id, stock);

    const productDiv = document.createElement("div");
    // checkoutCartContainer.appendChild(productDiv);

    productDiv.classList.add("checkout-product");
    productDiv.innerHTML = `<div class= "checkout-product-image">
     <img src="${image}" alt="${name}" width="70">
     </div>
      <div class = "checkout-product-details">
        <h4>${name}</h4>
        <p>Price: ₹${price}</p>
        <div class = "checkout-stockElement">
          <button class = "cartIncrement" data-id="${id}">+</button>
          <span class="checkout-productQuantity" data-quantity = "${LSActualData.quantity}">${LSActualData.quantity}</span>
          <button class = "cartDecrement" data-id="${id}">-</button>
        </div>
      </div>     
    `;

    checkoutCartContainer.appendChild(productDiv);

    //increment and decrement logic for checkout
    productDiv
      .querySelector(".checkout-stockElement")
      .addEventListener("click", (Event) => {
        incrementDecrement(Event, id, stock, price);

        const updatedLSData = fetchQuantityFromCartLS(id, stock);
        productDiv.querySelector(".checkout-productQuantity").textContent =
          updatedLSData.quantity;
        updateCartProductTotal();
      });
  });
});

//* Pay Now button logic
const payNowBtn = document.getElementById("payNowBtn");
const paymentPopup = document.getElementById("paymentSuccessPopup");

payNowBtn.addEventListener("click", () => {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const mobile = document.getElementById("userMobile").value.trim();
  const area = document.getElementById("userArea").value.trim();
  const pincode = document.getElementById("userPincode").value.trim();
  const address = document.getElementById("userAddress").value.trim();
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );

  if (
    !name ||
    !email ||
    !mobile ||
    !area ||
    !pincode ||
    !address ||
    !selectedPayment
  ) {
    alert("Please fill in all details and select a payment method.");
    return;
  }

  //create order data
  const orderData = {
    user: {
      name,
      email,
      mobile,
      area,
      pincode,
      address,
      paymentMethod: selectedPayment.value,
    },
    products: cartProducts,
    orderDate: new Date().toLocaleString(),
  };

  const existingOrders = JSON.parse(localStorage.getItem(orderData)) || [];

  existingOrders.push(orderData);

  localStorage.setItem("orderData", JSON.stringify(existingOrders));

  // Clear cart
  localStorage.removeItem("cartData");

  // Show payment success popup
  paymentPopup.style.display = "flex";
});

// Go Home button
document.getElementById("goHomeBtn").addEventListener("click", () => {
  window.location.href = "home.html";
});
