// ========== IMAGE SWITCHING ==========
document.querySelectorAll(".small-img").forEach(function (img) {
  img.addEventListener("click", function () {
    let targetId = this.getAttribute("data-target");
    let mainImg = document.getElementById(targetId);
    if (mainImg) {
      mainImg.src = this.src;
    }
  });
});

// ========= Picture larger view =========
function changeImage(newSrc) {
  var largeImage = document.getElementById("largeImage");
  largeImage.src = newSrc;
}

function openGallery(imgElement) {
  const gallery = document.getElementById("gallery");
  const largeImage = document.getElementById("largeImage");
  const thumbnailContainer = gallery.querySelector(".small-picture");
  const colorSelect = document.getElementById("galleryColorSelect");

  const largeSrc = imgElement.dataset.large || imgElement.src;
  largeImage.src = largeSrc;

  // Clear and add new thumbnails
  thumbnailContainer.innerHTML = "";
  const thumbs = JSON.parse(imgElement.dataset.thumbnails || "[]");

  thumbs.forEach((src) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.className = "thumbnail";
    thumb.onclick = (e) => {
      e.stopPropagation();
      changeImage(src);
    };
    thumbnailContainer.appendChild(thumb);
  });

  // Handle color selection
  const colorImages = JSON.parse(imgElement.dataset.colorImages || "{}");
  colorSelect.innerHTML = '<option value="">Select Color</option>';
  Object.keys(colorImages).forEach(color => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorSelect.appendChild(option);
  });
  colorSelect.onchange = function () {
    if (colorImages[this.value]) {
      largeImage.src = colorImages[this.value];
    }
  };

  gallery.style.display = "block";
}

// ===== Zooming controls =====
let zoomLevel = 1, isDragging = false, startX, startY, currentX = 0, currentY = 0;

function zoomImage(direction) {
  const largeImage = document.getElementById("largeImage");
  if (direction === 'in') zoomLevel += 0.1;
  else if (direction === 'out') {
    zoomLevel = Math.max(1, zoomLevel - 0.1);
    if (zoomLevel === 1) resetImagePosition();
  }
  updateImageTransform();
}

function updateImageTransform() {
  const largeImage = document.getElementById("largeImage");
  largeImage.style.transform = `scale(${zoomLevel}) translate(${currentX}px, ${currentY}px)`;
  largeImage.style.transition = 'transform 0.1s';
}

function resetImagePosition() { currentX = 0; currentY = 0; }

function closeGallery(event) {
  if (event) event.stopPropagation();
  document.getElementById("gallery").style.display = "none";
  zoomLevel = 1;
  resetImagePosition();
  updateImageTransform();
}

// Dragging functionality
const largeImage = document.getElementById("largeImage");
largeImage.addEventListener('mousedown', (e) => {
  if (zoomLevel <= 1) return;
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  largeImage.style.cursor = 'grabbing';
  largeImage.style.transition = 'none';
});
window.addEventListener('mouseup', () => {
  isDragging = false;
  largeImage.style.cursor = 'default';
});
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateImageTransform();
});
