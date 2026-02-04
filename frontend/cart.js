let cart = [];

const cartBox = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const whatsappBtn = document.getElementById("whatsappBtn");

cartBtn.onclick = () => openCart();
closeCart.onclick = () => closeCartFn();
overlay.onclick = () => closeCartFn();

function openCart() {
  cartBox.style.display = "block";
  overlay.style.display = "block";
}

function closeCartFn() {
  cartBox.style.display = "none";
  overlay.style.display = "none";
}

function addToCart(item) {
  const found = cart.find(i => i.id === item.id);

  if (found) {
    found.qty++;
  } else {
    cart.push({
      id: item.id,
      name: item.name_ar || item.name_en,
      price: item.price,
      currency: item.currency,
      qty: 1
    });
  }

  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let qty = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    qty += i.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${i.name} × ${i.qty}</span>
        <span>${i.price * i.qty} ${i.currency}</span>
      </div>
    `;
  });

  cartTotal.textContent = `المجموع: $${total}`;
  cartCount.textContent = qty;
}

whatsappBtn.onclick = () => {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let msg = "🛒 طلب جديد:\n\n";
  let total = 0;

  cart.forEach(i => {
    msg += `${i.name} × ${i.qty} = ${i.price * i.qty} ${i.currency}\n`;
    total += i.price * i.qty;
  });

  msg += `\nالمجموع: $${total}`;

  window.open(
    `https://wa.me/96178727986?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
};
