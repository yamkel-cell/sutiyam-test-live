// 1. Gallery opener
document.querySelectorAll(".product-img").forEach(img => {
  img.addEventListener("click", () => {
    openGallery(img); // your existing function
  });
});

// 2. Add to cart button
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    addToCartFromProduct(btn); // your existing function
  });
});

// 3. Toggle product description
document.querySelectorAll(".toggle-desc").forEach(btn => {
  btn.addEventListener("click", () => {
    let productCard = btn.closest(".product-card"); // find parent card
    let desc = productCard.querySelector(".product-desc");
    if (desc) {
      desc.style.display = desc.style.display === "none" ? "block" : "none";
    }
  });
});
