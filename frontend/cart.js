/*************************
 * Cart State
 *************************/
let cart = [];

/*************************
 * Add To Cart
 * (ينادى من app.js)
 *************************/
function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      currency: item.currency || "USD",
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
  const countEl = document.getElementById("cart-count");
  const itemsDiv = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!countEl || !itemsDiv || !totalEl) return;

  itemsDiv.innerHTML = "";

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>${item.price * item.qty} ${item.currency}</span>
    `;
    itemsDiv.appendChild(row);
  });

  countEl.textContent = totalQty;
  totalEl.textContent = `المجموع: ${totalPrice} USD`;
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
 * Send WhatsApp
 *************************/
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let msg = "🛒 طلب جديد:\n\n";
  let total = 0;

  cart.forEach(item => {
    msg += `${item.name} × ${item.qty} = ${item.price * item.qty} ${item.currency}\n`;
    total += item.price * item.qty;
  });

  msg += `\nالمجموع: ${total} USD`;

  const phone = "96178727986";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

/*************************
 * Make functions global
 * (مهم جدًا)
 *************************/
window.addToCart = addToCart;
window.toggleCart = toggleCart;
window.sendWhatsApp = sendWhatsApp;
