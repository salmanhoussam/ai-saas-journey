let cart = [];

function addToCart(item) {
  const found = cart.find(i => i.id === item.id);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = modal.style.display === "none" ? "block" : "none";
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");
  box.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    box.innerHTML += `<p>${item.name} × ${item.qty}</p>`;
  });

  totalBox.textContent = `المجموع: ${total} USD`;
}

function sendWhatsApp() {
  let msg = "مرحبا، أريد طلب:\n";
  let total = 0;

  cart.forEach(i => {
    msg += `${i.name} × ${i.qty}\n`;
    total += i.price * i.qty;
  });

  msg += `\nالمجموع: ${total} USD`;

  window.open(
    `https://wa.me/96178727986?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
