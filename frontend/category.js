import { supabase } from "./categories-db.js";
import { getCurrentLang, applyLanguage } from "./utils.js";

const currentLang = getCurrentLang();
applyLanguage(currentLang);

async function loadCategories() {
  const grid = document.getElementById("categoriesGrid");
  if (!grid) return;

  const { data, error } = await supabase
    .from("categories")
    .select("id, name_ar, name_en, image_url")
    .order("id");

  if (error) return console.error(error);

  grid.innerHTML = "";

  data.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";

    card.innerHTML = `
      <div class="category-hero" style="background-image:url('${cat.image_url}')">
        <div class="category-overlay">
          <h2>${currentLang === "ar" ? cat.name_ar : cat.name_en}</h2>
        </div>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `category.html?id=${cat.id}`;
    };

    grid.appendChild(card);
  });
}

loadCategories();
