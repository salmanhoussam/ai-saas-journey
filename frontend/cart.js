import {
  getCurrentLang,
  applyLanguage,
  getCart,
  updateQty
} from "./utils.js";
/* =====================
   TRANSLATIONS
===================== */
const t = {
  ar: {
    cart: "السلة",
    total: "الإجمالي",
    checkout: "تأكيد الطلب",
    empty: "السلة فارغة 🛒",
    note: "ملاحظات الطلب"
  },
  en: {
    cart: "Cart",
    total: "Total",
    checkout: "Confirm Order",
    empty: "Cart is empty 🛒",
    note: "Order notes"
  }
};
/* =====================
   STATE
===================== */
const lang = getCurrentLang();
applyLanguage(lang);

let cart = getCart();
function checkout() {
  if (!cart.length) {
    alert(t[lang].empty);
    return;
  }

  let message = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    message += `🍽️ ${item.name}\n`;
    message += `x${item.qty} - $${itemTotal}\n`;
    if (item.note) message += `📝 ${item.note}\n`;
    message += "\n";
  });

  message += `💰 ${t[lang].total}: $${total}`;

  // افتح واتساب
  window.open(
    `https://wa.me/96178727986?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  // 🔥 امسح السلة
  localStorage.removeItem("cart");

  // حدّث الحالة
  cart = [];
}
function renderCart() {
  const list = document.getElementById("cart-list");
  const totalDiv = document.getElementById("total");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-row">
        <strong>${item.name}</strong>
        <span>$${item.price * item.qty}</span>
      </div>

      <div class="cart-row qty">
        <button>-</button>
        <span>${item.qty}</span>
        <button>+</button>
      </div>

      <textarea placeholder="${t[lang].note}">${item.note || ""}</textarea>
    `;

    const [minus, plus] = div.querySelectorAll("button");

    minus.onclick = () => {
      updateQty(item.id, item.qty - 1);
      cart = getCart();
      renderCart();
    };

    plus.onclick = () => {
      updateQty(item.id, item.qty + 1);
      cart = getCart();
      renderCart();
    };

    div.querySelector("textarea").oninput = e => {
      item.note = e.target.value;
    };

    list.appendChild(div);
  });

  totalDiv.textContent = `${t[lang].total}: $${total}`;
}
/* =====================
   EVENTS
===================== */
document.getElementById("backBtn")?.addEventListener("click", () => {
  history.back();
});

document
  .getElementById("checkoutBtn")
  .addEventListener("click", checkout);
/* =====================
   INIT
===================== */
document.getElementById("cartTitle").textContent = t[lang].cart;
document.getElementById("checkoutBtn").textContent = t[lang].checkout;

renderCart();
