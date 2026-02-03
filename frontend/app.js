document.addEventListener("DOMContentLoaded", () => {
  const SUPABASE_URL = "https://znloborouipckokqpidu.supabase.co";
  const SUPABASE_KEY = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const phoneNumber = "96178727986";

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
      title.textContent = item.name || `Item #${item.id}`;

      const price = document.createElement("p");
      price.textContent = `${item.price} ${item.currency}`;

      const btn = document.createElement("a");
      btn.className = "whatsapp-btn";
      btn.textContent = "اطلب عبر واتساب";

      const msg = `مرحبا، أريد طلب ${title.textContent}`;
      btn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
      btn.target = "_blank";

      card.append(img, title, price, btn);
      menu.appendChild(card);
    });
  }

  loadMenu();
});
