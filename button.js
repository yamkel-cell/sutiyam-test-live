document.addEventListener("DOMContentLoaded", () => {
  // Open Gallery
  document.querySelectorAll(".open-gallery").forEach(img => {
    img.addEventListener("click", () => openGallery(img));
  });

  // Toggle Product Info
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.style.display =
          target.style.display === "none" || !target.style.display
            ? "block"
            : "none";
      }
    });
  });

  // Add to Cart
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => addToCartFromProduct(button));
  });

  // Close Gallery overlay
  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.addEventListener("click", e => {
      if (e.target.id === "gallery") {
        closeGallery();
      }
    });
  }

  // Close buttons
  document.querySelectorAll(".close-btn, .close").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      closeGallery();
    });
  });

  // ===== Zoom and Gallery Logic =====
  let zoomLevel = 1;
  let isDragging = false;
  let startX, startY, currentX = 0, currentY = 0;

  const largeImage = document.getElementById("largeImage");
  // gallery is already defined above

  // ===== Zooming =====
  function zoomImage(direction) {
    if (!largeImage) return;

    if (direction === 'in') {
      zoomLevel += 0.1;
    } else if (direction === 'out') {
      zoomLevel = Math.max(1, zoomLevel - 0.1);
      if (zoomLevel === 1) resetImagePosition();
    }
    updateImageTransform();
  }

  function updateImageTransform() {
    if (!largeImage) return;
    // Apply translate first, then scale (correct order)
    largeImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoomLevel})`;
    largeImage.style.transition = 'transform 0.1s ease';
  }

  function resetImagePosition() {
    currentX = 0;
    currentY = 0;
  }

  function closeGallery(event) {
    if (event) event.stopPropagation();
    if (gallery) gallery.style.display = "none";
    zoomLevel = 1;
    resetImagePosition();
    updateImageTransform();
  }

  // ===== Dragging =====
  if (largeImage) {
    largeImage.addEventListener("mousedown", e => {
      if (zoomLevel <= 1) return;
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      largeImage.style.cursor = "grabbing";
      largeImage.style.transition = "none";
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      largeImage.style.cursor = "default";
    });

    window.addEventListener("mousemove", e => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      updateImageTransform();
    });
  }

  // ===== Hook zoom buttons =====
  document.querySelectorAll(".zoom-controls button").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      zoomImage(btn.textContent === "+" ? "in" : "out");
    });
  });

  // ===== Hook close buttons =====
  document.querySelectorAll(".close-btn, .close").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      closeGallery();
    });
  });

  // ===== Helper for thumbnails =====
  window.changeImage = function(src) {
    if (largeImage) largeImage.src = src;
  };

});
