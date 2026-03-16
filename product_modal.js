// Handle click on each product container
document.querySelectorAll('.offered-product-container-col').forEach(product => {
  product.addEventListener('click', function (e) {
    // 🔒 Only open modal when clicking <h5> or its inner <i> icon
    if (!e.target.closest('h5')) return;

    // Extract details
    const mainImg = product.querySelector('img');
    const title = product.querySelector('h3')?.innerText || "Untitled Product";
    const price = product.getAttribute('data-price') || "0";
    const desc = product.querySelector('.ProductDesc p')?.innerText || "No description available.";

    // Update modal image and info
    document.getElementById('modalImage').src = mainImg.src;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = "R" + price;
    document.getElementById('modalDescription').innerText = desc;

    // --- Sizes ---
    const sizeSelect = product.querySelector('select[id^="size"]');
    const modalSize = document.getElementById('modalSize');
    modalSize.innerHTML = ""; // clear previous
    if (sizeSelect) {
      Array.from(sizeSelect.options).forEach(opt => {
        const option = document.createElement("option");
        option.text = opt.text;
        option.value = opt.value;
        modalSize.appendChild(option);
      });
    }

    // --- Colors ---
    const colorSelect = product.querySelector('select[id^="color"]');
    const modalColor = document.getElementById('modalColor');
    modalColor.innerHTML = "";
    if (colorSelect) {
      Array.from(colorSelect.options).forEach(opt => {
        const option = document.createElement("option");
        option.text = opt.text;
        option.value = opt.value;
        modalColor.appendChild(option);
      });
    }

    // --- Thumbnails from data-thumbnails ---
    const thumbContainer = document.querySelector('.modal-thumbnails');
    thumbContainer.innerHTML = "";
    const dataThumbs = mainImg.getAttribute('data-thumbnails');
    if (dataThumbs) {
      const thumbnails = JSON.parse(dataThumbs);
      thumbnails.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.addEventListener('click', () => {
          document.getElementById('modalImage').src = url;
        });
        thumbContainer.appendChild(img);
      });
    }

    // Show modal
    document.getElementById('productModal').style.display = 'flex';
  });
});

// Close modal when clicking outside or the close button
function closeProductModal(event) {
  if (event.target.id === "productModal" || event.target.classList.contains("close-btn")) {
    document.getElementById('productModal').style.display = 'none';
  }
}

// Add to cart from modal (connect to your cart function)
window.addToCartFromModal = function () {
  const name = document.getElementById("modalTitle")?.innerText || "";
  const priceText = document.getElementById("modalPrice")?.innerText.replace("R", "").trim() || "0";
  const price = parseFloat(priceText) || 0;
  const size = document.getElementById("modalSize")?.value || "";
  const color = document.getElementById("modalColor")?.value || "";
  const quantity = parseInt(document.getElementById("modalQuantity")?.value) || 1;
  const image = document.getElementById("modalImage")?.src || "";

  // Validate
  if (!size || size === "Select Size") return alert("Please select a size.");
  if (!color || color === "Select Color" || color === "") return alert("Please select a color.");
  if (quantity <= 0) return alert("Please enter a valid quantity.");

  // Check if already in cart
  const existing = cartItems.find(item => item.name === name && item.size === size && item.color === color);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cartItems.push({ name, price, size, color, quantity, image });
  }

  // Persist and update
  saveCart();
  updateCartDisplay();
  updateCartCount();

  showToast(`Added ${quantity} x ${name} (${size}) (${color})`, "success");

  // Close modal
  const modal = document.getElementById("productModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
};