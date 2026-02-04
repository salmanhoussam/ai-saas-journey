let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.desc || ""}</p>

      <div class="cart-row">
        <span class="price">${item.price} $</span>
        <div class="qty">
          <button onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let msg = "🛒 طلب جديد:\n\n";
  let total = 0;

  cart.forEach(i => {
    msg += `${i.name} × ${i.qty} = ${i.price * i.qty}$\n`;
    total += i.price * i.qty;
  });

  msg += `\nالمجموع: ${total}$`;

  window.open(
    `https://wa.me/96178727986?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

renderCart();
