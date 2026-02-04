// cart.js
let cart = [];

// إضافة عنصر للسلة
function addToCart(item) {
  const existingItem = cart.find(i => i.id === item.id);

  if (existingItem) {
    existingItem.qty += 1; // 👈 زِد الكمية
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

// تحديث رقم السلة
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = count;
}
