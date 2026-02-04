// cart.js

let cart = [];

const cartCountEl = document.getElementById("cart-count");

// تحديث رقم السلة
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalQty;
}

// إضافة عنصر للسلة
function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      currency: item.currency,
      qty: 1
    });
  }

  updateCartCount();
  console.log("Cart:", cart);
}
