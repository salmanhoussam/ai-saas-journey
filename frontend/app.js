const supabaseUrl = "https://znloborouipckokpidu.supabase.co";
const supabaseKey = "sb_publishable_1sLCk0nZR20iQCyvRqfoxg_uI6Mun2c";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const menuDiv = document.getElementById("menu");

async function loadMenu() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true);

  if (error) {
    console.error(error);
    return;
  }

  menuDiv.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.image_url}">
      <h4>${item.name_ar || item.name_en}</h4>
      <p>${item.price} ${item.currency}</p>
      <button>أضف إلى السلة</button>
    `;

    div.querySelector("button").onclick = () => addToCart(item);
    menuDiv.appendChild(div);
  });
}

loadMenu();
