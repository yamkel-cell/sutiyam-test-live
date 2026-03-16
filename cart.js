// ========== CART SYSTEM ==========

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

window.addToCart = function (productName, productPrice, sizeSelectId, colorSelectId) {
  const colorSelect = document.getElementById(colorSelectId);
  const sizeSelect = document.getElementById(sizeSelectId);

  if (!sizeSelect || !colorSelect) return alert("Selectors missing.");
  const size = sizeSelect.value, color = colorSelect.value;
  if (size === "Select Size") return alert("Select a size.");
  if (color === "Select Color" || color === "") return alert("Select a color.");

  let quantity = 1;
  const productSection = sizeSelect.closest(".ProductDesc, .product-desc");
  if (productSection) {
    const input = productSection.querySelector('input[type="number"]');
    if (input) quantity = parseInt(input.value) || 1;
  }

  const existing = cartItems.find(item => item.name === productName && item.size === size && item.color === color);
  if (existing) existing.quantity += quantity;
  else cartItems.push({ name: productName, price: productPrice, quantity, size, color });

  updateCartDisplay();
  saveCart();
  showToast(`Added ${quantity} x ${productName} (${size}) (${color})`);
};

window.removeCartItem = function (index) {
  const removedItem = cartItems.splice(index, 1)[0];
  updateCartDisplay();
  saveCart();
  showToast(`Removed ${removedItem.name} (${removedItem.size})`, "warning");
};

function updateCartDisplay() {
  if (!cartItemsContainer || !totalPriceElement) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image || ''}" alt="${item.name}" style="width:50px;height:auto;margin-right:10px;">
      ${item.name} (${item.size}) (${item.color || 'No color'}) - R${item.price} x ${item.quantity}
      <button onclick="removeCartItem(${index})" style="margin-left: 10px;">❌</button>
    `;
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    cartItemsContainer.appendChild(itemDiv);
  });

  totalPriceElement.textContent = total.toFixed(2);
}

window.placeOrder = function () {
  if (cartItems.length === 0) return showToast("Your cart is empty!", "error");
  const orderDetails = cartItems.map(item => `${item.name} (${item.size}) (${item.color}) x${item.quantity} - R${item.price}\nImage: ${item.image}`).join("\n\n");
  
  document.getElementById("order-details").value = orderDetails;
  showToast("Order placed! Check your email!");
  cartItems.length = 0;
  localStorage.removeItem("cartItems");
  updateCartDisplay();
  saveCart();
  updateCartCount();
};

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
});

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return; // Don’t break if header not loaded yet
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems > 0 ? totalItems : "0";
}


//======= Checkout Script =======
function submitOrder(event) {
  event.preventDefault();
  const form = document.getElementById("order-form");
  const orderDetails = localStorage.getItem("cartItems");
  if (!orderDetails || JSON.parse(orderDetails).length === 0) return alert("Cart is empty.");
  document.getElementById("order-details").value = orderDetails;
  alert("Order placed successfully! 🎉");
  localStorage.removeItem("cartItems");
  form.reset();
}
