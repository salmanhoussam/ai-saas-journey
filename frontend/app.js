document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Supabase config
  // ===============================
  const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
  const SUPABASE_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  // ===============================
  // Cart State
  // ===============================
  let cart = [];

  function addToCart(item) {
    const existing = cart.find(i => i.id === item.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: item.id,
      name:
      item.name_ar ||
      item.name_en ||
     `Item #${item.id}`,

        price: item.price,
        currency: item.currency,
        qty: 1
      });
    }

    console.log("🛒 Cart:", cart);
  }

  // ===============================
  // Load Menu
  // ===============================
  async function loadMenu() {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("is_available", true);

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    renderMenu(data);
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

      const img = document.createElement("img");
      img.src = item.image_url;
      img.alt = "menu item";

      const title = document.createElement("h3");
      title.textContent =
       item.name_ar ||
       item.name_en ||
      `Item #${item.id}`;


      const price = document.createElement("p");
      price.textContent = `${item.price} ${item.currency}`;

      const btn = document.createElement("button");
btn.className = "whatsapp-btn";
btn.textContent = "أضف إلى السلة 🛒";

btn.addEventListener("click", () => {
  addToCart({
    id: item.id,
    name: item.name_ar || item.name_en || item.name,
    price: item.price,
    currency: item.currency
  });
});


      btn.onclick = () => {
        addToCart(item);
      };

      card.append(img, title, price, btn);
      menu.appendChild(card);
    });
  }

  // ===============================
  loadMenu();
});
