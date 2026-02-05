/* ===============================
   Supabase config
================================ */
const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
const SUPABASE_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/* ===============================
   Cart (localStorage)
================================ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===============================
   Load menu from Supabase
================================ */
async function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "⏳ جاري تحميل المنيو...";

  const { data: categories, error: catError } = await db
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("order");

  if (catError) {
    console.error(catError);
    menuDiv.innerHTML = "❌ خطأ بتحميل الكاتيجوري";
    return;
  }

  menuDiv.innerHTML = "";

  for (const category of categories) {
    const { data: items, error: itemError } = await db
      .from("menu_items")
      .select("*")
      .eq("category_id", category.id)
      .eq("is_available", true);

    if (itemError) {
      console.error(itemError);
      continue;
    }

    const catDiv = document.createElement("div");
    catDiv.className = "category";
    catDiv.innerHTML = `<h2>${category.name}</h2>`;

    items.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      itemDiv.innerHTML = `
        <img src="${item.image_url}" alt="${item.name_ar}" />
        <div class="item-info">
          <strong>${item.name_ar}</strong>
          <span>${item.price} ${item.currency}</span>
        </div>
        <button onclick="addToCart(
          ${item.id},
          '${item.name_ar}',
          ${item.price}
        )">
          إضافة
        </button>
      `;

      catDiv.appendChild(itemDiv);
    });

    menuDiv.appendChild(catDiv);
  }
}

/* ===============================
   Cart functions
================================ */
function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      qty: 1,
      note: ""
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function goToCart() {
  window.location.href = "cart.html";
}

/* ===============================
   Init
================================ */
loadMenu();
updateCartCount();
