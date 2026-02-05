let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* عرض السلة */
function renderCart() {
  const list = document.getElementById("cart-list");
  const totalDiv = document.getElementById("total");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-row">
        <strong>${item.name}</strong>
        <span>$${itemTotal}</span>
      </div>

      <div class="cart-row qty">
        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>

      <div class="note">
        <textarea
          placeholder="ملاحظات الطلب (بدون بصل، صوص زيادة...)"
          oninput="saveNote(${index}, this.value)"
        >${item.note || ""}</textarea>
      </div>
    `;

    list.appendChild(div);
  });

  totalDiv.textContent = `الإجمالي: $${total}`;
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

/* إرسال الطلب عبر واتساب */
function checkout() {
  if (cart.length === 0) {
    alert("السلة فارغة 🛒");
    return;
  }

  let message = "🛒 *طلب جديد*\n\n";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    message += `🍽️ ${item.name}\n`;
    message += `الكمية: ${item.qty}\n`;
    message += `السعر: $${itemTotal}\n`;

    if (item.note && item.note.trim() !== "") {
      message += `📝 ملاحظة: ${item.note}\n`;
    }

    message += "\n";
  });

  message += `💰 *الإجمالي: $${total}*`;

  const phone = "96178727986"; // ضع رقم المطعم
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* تشغيل أولي */
renderCart();
