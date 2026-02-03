// ===============================
// Supabase config
// ===============================
const SUPABASE_URL = "https://znloborouipckokqpidu.co";
const SUPABASE_ANON_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// Global state
// ===============================
let lang = "ar";
const menu = document.getElementById("menu");

// ===============================
// Change language
// ===============================
function setLang(l) {
  lang = l;
  loadMenu();
}

// ===============================
// Load menu
// ===============================
async function loadMenu() {
  menu.innerHTML = "Loading...";

  const { data, error } = await supabase
    .from("menu")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    menu.innerHTML = "Error loading menu";
    return;
  }

  renderMenu(data);
}

// ===============================
// Render menu
// ===============================
function renderMenu(items) {
  menu.innerHTML = "";

  items.forEach(item => {
    const name = lang === "ar" ? item.name_ar : item.name_en;

    menu.innerHTML += `
      <div class="item">
        <img src="${item["image-url"]}" alt="${name}" />

        <h3>${name}</h3>

        <p>${lang === "ar" ? "السعر" : "Price"}: $${item.price}</p>

        <a
          class="whatsapp-btn"
          target="_blank"
          href="https://wa.me/96178727986?text=${encodeURIComponent(
            lang === "ar"
              ? `أريد طلب ${item.name_ar}`
              : `I want to order ${item.name_en}`
          )}"
        >
          ${lang === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp"}
        </a>
      </div>
    `;
  });
}

// ===============================
// Init
// ===============================
loadMenu();
