
export const getCurrentLang = () => {
  return localStorage.getItem("lang") || "ar";
};

export const setCurrentLang = (lang) => {
  localStorage.setItem("lang", lang);
};
export const toggleLanguage = () => {
  const current = getCurrentLang();
  const newLang = current === "ar" ? "en" : "ar";
  setCurrentLang(newLang);
  return newLang;
};
export const applyLanguage = (lang) => {
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
};
const CART_KEY = "cart";

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
export const addToCart = (item) => {
  const cart = getCart();

  const existing = cart.find(p => p.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
};
export const updateQty = (id, qty) => {
  let cart = getCart();

  cart = cart.map(item =>
    item.id === id ? { ...item, qty } : item
  ).filter(item => item.qty > 0);

  saveCart(cart);
};
export const removeFromCart = (id) => {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
};
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
};
