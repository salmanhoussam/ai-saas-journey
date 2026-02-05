import { supabase } from "./categories-db.js";

let currentLang = "ar";

async function loadCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name_ar, name_en, image_url")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  const grid = document.getElementById("categoriesGrid");
  const hero = document.getElementById("hero");

  grid.innerHTML = "";

  const firstWithImage = data.find(c => c.image_url);
  if (hero && firstWithImage) {
    hero.style.backgroundImage = `url('${firstWithImage.image_url}')`;
  }

  data.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    if (!cat.image_url) card.classList.add("no-image");

    card.innerHTML = `
      ${cat.image_url ? `
        <div class="category-image">
          <img src="${cat.image_url}" alt="">
        </div>` : ""}
      <h3 class="category-name"
          data-ar="${cat.name_ar}"
          data-en="${cat.name_en}">
        ${currentLang === "ar" ? cat.name_ar : cat.name_en}
      </h3>
    `;

    grid.appendChild(card);
  });
}

loadCategories();
