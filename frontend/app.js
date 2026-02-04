/*************************
 * Supabase Config
 *************************/
const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
const SUPABASE_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/*************************
 * Cart State
 *************************/
let cart = [];

/*************************
 * Add to Cart
 *************************/
function addToCart(item) {
  const found = cart.find(i => i.id === item.id);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }

  updateCartUI();
  console.log("🛒 Cart:", cart);
}

/*************************
 * Update Cart UI
 *************************/
function updateCartUI() {
  const itemsDiv = document.getElementById("cart-items");
  const countSpan = document.getElementById("cart-count");
  const totalP = document.getElementById("cart-total");

  if (!itemsDiv || !countSpan || !totalP) return;

  itemsDiv.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>USD ${item.price * item.qty}</span>
    `;
    itemsDiv.appendChild(row);
  });

  countSpan.textContent = count;
  totalP.textContent = `المجموع: USD ${total}`;
}

/*************************
 * Toggle Cart
 *************************/
function toggleCart() {
  const modal = document.getElementById("cart-modal");
  const overlay = document.getElementById("cart-overlay");

  if (!modal || !overlay) return;

  modal.classList.toggle("show");
  overlay.classList.toggle("show");
}

/*************************
 * Send WhatsApp Order
 *************************/
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let message = "🛒 طلب جديد:\n\n";
  let total = 0;

  cart.forEach(item => {
    message += `${item.name} × ${item.qty} = USD ${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\nالمجموع: USD ${total}`;

  const phone = "96178727986"; // رقمك
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/*************************
 * Load Menu from Supabase
 *************************/
document.addEventListener("DOMContentLoaded", async () => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true);

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  renderMenu(data);
});

/*************************
 * Render Menu
 *************************/
function renderMenu(items) {
  const menuDiv = document.getElementById("menu");
  if (!menuDiv) return;

  menuDiv.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.image_url}" alt="">
      <h3>${item.name_ar || item.name_en}</h3>
      <p>USD ${item.price}</p>
      <button>أضف إلى السلة</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      addToCart({
        id: item.id,
        name: item.name_ar || item.name_en,
        price: item.price
      });
    });

    menuDiv.appendChild(div);
  });
}

/*************************
 * Make functions global
 *************************/
window.toggleCart = toggleCart;
window.sendWhatsApp = sendWhatsApp;
window.addToCart = addToCart;
