const menuItems = [
  { id: 1, name: "Twister", price: 5, desc: "Chicken wrap" },
  { id: 2, name: "Fajita", price: 4.5, desc: "Spicy fajita" },
  { id: 3, name: "Philadelphia", price: 5, desc: "Cheese sandwich" }
];

menuItems.forEach(item => {
  cart.push({ ...item, qty: 1 });
});

localStorage.setItem("cart", JSON.stringify(cart));
