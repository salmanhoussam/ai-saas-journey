let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* عرض السلة */
function renderCart() {
  const list = document.getElementById("cart-list");
  const totalDiv = document.getElementById("total");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-row">
        <strong>${item.name}</strong>
        <span>$${item.price * item.qty}</span>
      </div>

      <div class="cart-row qty">
        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>

      <div class="note">
        <textarea
          placeholder="Add note (no onion, extra sauce...)"
          oninput="saveNote(${index}, this.value)"
        >${item.note || ""}</textarea>
      </div>
    `;

    list.appendChild(div);
  });

  totalDiv.textContent = `Total: $${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* تغيير الكمية */
function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

/* حفظ الملاحظة */
function saveNote(index, text) {
  cart[index].note = text;
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Checkout (لاحقاً واتساب أو API) */
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  console.log(cart);
  alert("Order ready ✔ (check console)");
}

renderCart();
