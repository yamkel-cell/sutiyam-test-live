// ========== MENU TOGGLE ==========
var MenuItems = document.getElementById("MenuItems");
if (MenuItems) {
  MenuItems.style.maxHeight = "0px";
  window.menutoggle = function () {
    MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "150px" : "0px";
  };
}

// ========== CART TOGGLE ==========
document.querySelector(".cart-toggle-icon")?.addEventListener("click", function () {
  let cart = document.getElementById("cart-panel");
  if (cart) {
    cart.style.display = cart.style.display === "none" ? "block" : "none";
  }
});

// ========== PRODUCT TOGGLE BUTTONS ==========
document.querySelectorAll(".toggle-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    let targetId = this.getAttribute("data-target");
    let targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.style.display = targetElement.style.display === "none" ? "block" : "none";
    }
  });
});

// ========== SEARCH ==========
window.searchProducts = function () {
  const input = document.getElementById("searchBox").value.toLowerCase();
  const suggestionList = document.getElementById("suggestionList");
  const productBoxes = document.querySelectorAll(".col-4");
  suggestionList.innerHTML = "";

  if (input === "") return;

  let matches = [];
  productBoxes.forEach(product => {
    const img = product.querySelector("img");
    const name = product.querySelector("h4, h3");
    const tag = img?.getAttribute("tagname")?.toLowerCase() || "";
    const alt = img?.alt?.toLowerCase() || "";
    const title = name?.innerText?.toLowerCase() || "";
    const match = tag.includes(input) || alt.includes(input) || title.includes(input);
    if (match) {
      matches.push({ name: title, element: product });
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = match.name;
    li.style.cursor = "pointer";
    li.addEventListener("click", function () {
      match.element.scrollIntoView({ behavior: "smooth" });
      match.element.style.border = "2px solid #00f";
      setTimeout(() => match.element.style.border = "", 1500);
      document.getElementById("searchBox").value = "";
      suggestionList.innerHTML = "";
    });
    suggestionList.appendChild(li);
  });
};

// ========== SORTING ==========
function sortFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  const products = Array.from(container.querySelectorAll(".col-4"));
  const sortValue = document.getElementById("sortSelect").value;
  if (sortValue === "default") return;

  products.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute("data-price"));
    const priceB = parseFloat(b.getAttribute("data-price"));
    return sortValue === "lowToHigh" ? priceA - priceB : priceB - priceA;
  });

  products.forEach(product => container.appendChild(product));
}

// ====== RATING SYSTEM ======
document.querySelectorAll('.rating').forEach(function (ratingBlock) {
  const stars = ratingBlock.querySelectorAll('.fa-star');
  const productId = ratingBlock.getAttribute('data-product-id');

  stars.forEach(function (star) {
    star.addEventListener('mouseover', function () {
      highlightStars(stars, parseInt(this.getAttribute('data-rating')));
    });
    star.addEventListener('mouseout', function () {
      highlightStars(stars, parseInt(ratingBlock.getAttribute('data-selected')) || 0);
    });
    star.addEventListener('click', function () {
      const rating = parseInt(this.getAttribute('data-rating'));
      if (localStorage.getItem(`voted_${productId}`) === 'true') return alert("Already rated.");
      ratingBlock.setAttribute('data-selected', rating);
      highlightStars(stars, rating);
      localStorage.setItem(`voted_${productId}`, 'true');
      submitRatingByEmail(productId, rating);
    });
  });

  function highlightStars(stars, rating) {
    stars.forEach(star => {
      star.classList.remove('hover', 'selected');
      if (parseInt(star.getAttribute('data-rating')) <= rating) {
        star.classList.add('selected');
      }
    });
  }
});

function submitRatingByEmail(productId, rating) {
  const email = "sutiyam.orders@gmail.com";
  const subject = `New Rating for Product ID: ${productId}`;
  const body = `User submitted a rating of ${rating} for product ID: ${productId}.`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ========== EXPLORE NOW BUTTONS ==========
let buttonElements = document.querySelectorAll(".explore-now-button");
buttonElements.forEach(function (button) {
  button.addEventListener("click", function () {
    
}