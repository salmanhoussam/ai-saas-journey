// =======================
// Cart State
// =======================
let cart = [];

// =======================
// Add item to cart
// =======================
function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }

  console.log("Cart:", cart);
}
