import { supabase } from "./categories-db.js";
import {
  getCurrentLang,
  toggleLanguage,
  applyLanguage,
  getCartCount
} from "./utils.js";

/* =====================
   ELEMENTS
===================== */
const langBtn = document.getElementById("langToggle");
const menuTitle = document.getElementById("menuTitle");
const restaurantName = document.getElementById("restaurantName");

const cartBtn = document.querySelector(".cart-top-left");
const cartCount = document.getElementById("cartCount");

const categoriesGrid = document.getElementById("categoriesGrid");

/* =====================
   LANGUAGE
===================== */
let currentLang = getCurrentLang();

function updateTexts() {
  const isAr = currentLang === "ar";

  if (langBtn) langBtn.textContent = isAr ? "EN" : "AR";
  if (menuTitle) menuTitle.textContent = isAr ? "القائمة" : "Menu";
  if (restaurantName) {
    restaurantName.textContent = isAr
      ? "مطعم سلمان"
      : "Salman Restaurant";
  }
}

function initLanguage() {
  applyLanguage(currentLang);
  updateTexts();
}

langBtn?.addEventListener("click", () => {
  currentLang = toggleLanguage();
  applyLanguage(currentLang);
  updateTexts();
  loadCategories();
});

/* =====================
   CATEGORIES
===================== */
async function loadCategories() {
  if (!categoriesGrid) return;

  const { data, error } = await supabase
    .from("categories")
    .select("id, name_ar, name_en, image_url")
    .order("id");

  if (error) {
    console.error("Error loading categories:", error);
    return;
  }

  categoriesGrid.innerHTML = "";

  data.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    if (!cat.image_url) card.classList.add("no-image");

    card.innerHTML = `
      ${cat.image_url ? `<img src="${cat.image_url}" alt="">` : ""}
      <h2 class="category-name">
        ${currentLang === "ar" ? cat.name_ar : cat.name_en}
      </h2>
    `;

    card.addEventListener("click", () => {
      window.location.href = `item.html?category=${cat.id}`;
    });

    categoriesGrid.appendChild(card);
  });
}

/* =====================
   CART
===================== */
function updateCartUI() {
  if (!cartCount) return;

  const totalQty = getCartCount();
  cartCount.textContent = totalQty;
  cartCount.style.display = totalQty > 0 ? "flex" : "none";

  cartBtn?.classList.toggle("has-items", totalQty > 0);
}

cartBtn?.addEventListener("click", () => {
  window.location.href = "cart.html";
});

/* =====================
   INIT
===================== */
initLanguage();
loadCategories();
updateCartUI();
