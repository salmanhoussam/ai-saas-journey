// ====== SETTINGS ======
const WHATSAPP_NUMBER = "96178727986";

// اللغة الافتراضية
let currentLang = "ar";

// ====== MENU DATA ======
const menuData = [
  {
    name_ar: "قريدس",
    name_en: "Shrimp Sandwich",
    price: "6$",
    image: "images/shrimp1.jpg"
  },
  {
    name_ar: "قريدس مقلي",
    name_en: "Fried Shrimp",
    price: "6$",
    image: "images/shrimp2.jpg"
  },
  {
    name_ar: "توستر",
    name_en: "Toaster",
    price: "5$",
    image: "images/toaster.jpg"
  },
  {
    name_ar: "فاهيتا",
    name_en: "Fajita",
    price: "4.5$",
    image: "images/fajita.jpg"
  },
  {
    name_ar: "فلادلفيا",
    name_en: "Philadelphia",
    price: "5$",
    image: "images/philadelphia.jpg"
  }
];

// ====== ELEMENTS ======
const menu = document.getElementById("menu");
const btnAr = document.getElementById("btn-ar");
const btnEn = document.getElementById("btn-en");

// ====== RENDER MENU ======
function renderMenu() {
  menu.innerHTML = "";

  menuData.forEach(item => {
    const name = currentLang === "ar" ? item.name_ar : item.name_en;
    const priceLabel = currentLang === "ar" ? "السعر" : "Price";
    const orderText = currentLang === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp";

    menu.innerHTML += `
      <div class="item">
        <img src="${item.image-url}" alt="${name}">
        <h3>${name}</h3>
        <p>${priceLabel}: ${item.price}</p>

        <button
          class="whatsapp-btn"
          data-name-ar="${item.name_ar}"
          data-name-en="${item.name_en}"
          data-price="${item.price}"
        >
          ${orderText}
        </button>
      </div>
    `;
  });
}

// ====== LANGUAGE SWITCH ======
btnAr.addEventListener("click", () => {
  currentLang = "ar";
  document.documentElement.lang = "ar";
  renderMenu();
});

btnEn.addEventListener("click", () => {
  currentLang = "en";
  document.documentElement.lang = "en";
  renderMenu();
});

// ====== WHATSAPP ORDER ======
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("whatsapp-btn")) return;

  const nameAr = e.target.dataset.nameAr;
  const nameEn = e.target.dataset.nameEn;
  const price = e.target.dataset.price;

  const message =
    currentLang === "ar"
      ? `مرحبا 👋\nأود طلب:\n${nameAr}\nالسعر: ${price}`
      : `Hello 👋\nI would like to order:\n${nameEn}\nPrice: ${price}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

// ====== INIT ======
renderMenu();

