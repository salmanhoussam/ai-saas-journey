import { supabase } from "./categories-db.js";
import {
  getCurrentLang,
  applyLanguage,
  addToCart,
  getCartCount
} from "./utils.js";

/* =====================
   STATE
===================== */
const params = new URLSearchParams(location.search);
const categoryId = params.get("category");
let currentLang = getCurrentLang();
applyLanguage(currentLang);

/* =====================
   ELEMENTS
===================== */
const grid = document.getElementById("itemsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

const checkoutBar = document.getElementById("checkoutBar");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutText = document.getElementById("checkoutText");
const checkoutBtn = document.getElementById("checkoutBtn");

const backBtn = document.querySelector(".back-btn");

/* =====================
   LOAD ITEMS
===================== */
async function loadItems() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("id, name_ar, name_en, price, image_url")
    .eq("category_id", categoryId);

  if (error) return console.error(error);

  grid.innerHTML = "";

  data.forEach(item => {
    const name = currentLang === "ar" ? item.name_ar : item.name_en;
    const btnText = currentLang === "ar" ? "إضافة إلى السلة" : "Add to Cart";

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <img src="${item.image_url}">
      <div class="item-info">
        <div class="item-name">${name}</div>
        <div class="item-price">$${item.price}</div>
        <button class="add-to-cart-btn">${btnText}</button>
      </div>
    `;

    card.querySelector("button").onclick = () => {
      addToCart({
        id: item.id,
        name,
        price: item.price
      });

      updateCartUI();
      updateCheckoutBar();
      showToast(
        currentLang === "ar"
          ? "تمت الإضافة إلى السلة"
          : "Added to cart"
      );
    };

    grid.appendChild(card);
  });
}

/* =====================
   CART UI
===================== */
function updateCartUI() {
  const count = getCartCount();
  cartCount.textContent = count;
  cartCount.style.display = count ? "flex" : "none";
}

/* =====================
   CHECKOUT BAR
===================== */
function updateCheckoutBar() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.length) {
    checkoutBar.classList.add("hidden");
    return;
  }

  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.qty;
  });

  checkoutTotal.textContent = `$${totalPrice}`;
  checkoutBar.classList.remove("hidden");
}

function updateCheckoutLanguage() {
  if (!checkoutText) return;

  checkoutText.textContent =
    currentLang === "ar" ? "إتمام الطلب" : "Checkout";
}

/* =====================
   TOAST
===================== */
function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = text;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 1500);
}

/* =====================
   EVENTS
===================== */
cartBtn.onclick = () => (location.href = "cart.html");
checkoutBtn.onclick = () => (location.href = "cart.html");

if (backBtn) {
  backBtn.addEventListener("click", () => history.back());
}

/* =====================
   INIT
===================== */
loadItems();
updateCartUI();
updateCheckoutBar();
updateCheckoutLanguage();
