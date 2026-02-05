/* ===============================
   Supabase config
================================ */
const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
const SUPABASE_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

const supabase = window.supabase.createClient(
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

  /* 1️⃣ جلب الكاتيجوري */
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("order");

  if (catError) {
    menuDiv.innerHTML = "❌ خطأ بتحميل الكاتيجوري";
    console.error(catError);
    return;
  }

  menuDiv.innerHTML = "";

  /* 2️⃣ لكل كاتيجوري نجيب العناصر */
  for (const category of categories) {
    const { data: items, error: itemError } = await supabase
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
        <span>
          ${item.name_ar}
          - ${item.price} ${item.currency}
        </span>
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
