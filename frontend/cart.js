document.addEventListener("DOMContentLoaded", () => {

  let cart = [];

  const cartCountEl = document.getElementById("cart-count");

  function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
  }

  function addToCart(item) {
    const existing = cart.find(i => i.id === item.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name_ar || item.name_en || "Item",
        price: item.price,
        currency: item.currency,
        qty: 1
      });
    }

    updateCartCount();
    console.log("🛒 Cart:", cart);
  }

  // ===============================
  // Render Menu
  // ===============================
  function renderMenu(items) {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "item";

      card.innerHTML = `
        <img src="${item.image_url}">
        <h3>${item.name_ar || item.name_en}</h3>
        <p>${item.price} ${item.currency}</p>
        <button class="whatsapp-btn">أضف إلى السلة</button>
      `;

      const btn = card.querySelector("button");
      btn.addEventListener("click", () => addToCart(item));

      menu.appendChild(card);
    });
  }

});
