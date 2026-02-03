// ===============================
// Supabase config
// ===============================
const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// Global variables
// ===============================
let lang = "ar";
const menu = document.getElementById("menu");

// ===============================
// Change language
// ===============================
function setLang(selectedLang) {
  lang = selectedLang;
  loadMenu();
}

// ===============================
// Load menu from Supabase
// ===============================
async function loadMenu() {
  menu.innerHTML = "Loading...";

  const { data, error } = await supabase
    .from("menu")
    .select("*");

  if (error) {
    console.error(error);
    menu.innerHTML = "Error loading menu";
    return;
  }

  renderMenu(data);
}

// ===============================
// Render menu items
// ===============================
function renderMenu(data) {
  menu.innerHTML = "";

  data.forEach(item => {
    menu.innerHTML += `
      <div class="item">
        <img src="${item["image-url"]}" alt="${item.name_en}">
        
        <h3>
          ${lang === "ar" ? item.name_ar : item.name_en}
        </h3>

        <p>
          ${lang === "ar" ? "السعر" : "Price"}: $${item.price}
        </p>

        <a 
          class="whatsapp-btn"
          href="https://wa.me/96178727986?text=${encodeURIComponent(
            lang === "ar"
              ? `أريد طلب ${item.name_ar}`
              : `I want to order ${item.name_en}`
          )}"
          target="_blank"
        >
          ${lang === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp"}
        </a>
      </div>
    `;
  });
}

// ===============================
// Initial load
// ===============================
loadMenu();
