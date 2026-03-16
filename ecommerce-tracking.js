// -----------------------------
// CONFIG: GA4 & Meta Pixel IDs
// -----------------------------
const GA4_MEASUREMENT_ID = "G-Z5THBLY4JX"; // GA4 ID
const META_PIXEL_ID = "XXXXXXXXXXXXXXX";    //  Meta Pixel ID

// Load GA4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', GA4_MEASUREMENT_ID);

// Load Meta Pixel
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', META_PIXEL_ID);
fbq('track', 'PageView');

// -----------------------------
// HELPER: Track Product View
// -----------------------------
function trackProductView(product) {
  // GA4
  gtag('event', 'view_item', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.sku,
      item_name: product.name,
      price: product.price
    }]
  });

  // Meta Pixel
  fbq('track', 'ViewContent', {
    content_ids: [product.sku],
    content_name: product.name,
    currency: 'USD',
    value: product.price
  });
}

// -----------------------------
// HELPER: Track Add to Cart
// -----------------------------
function trackAddToCart(product) {
  // GA4
  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.sku,
      item_name: product.name,
      price: product.price,
      quantity: product.quantity || 1
    }]
  });

  // Meta Pixel
  fbq('track', 'AddToCart', {
    content_ids: [product.sku],
    content_name: product.name,
    currency: 'USD',
    value: product.price
  });
}

// -----------------------------
// HELPER: Track Purchase (after EmailJS)
// -----------------------------
function trackPurchase(product) {
  // GA4
  gtag('event', 'purchase', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.sku,
      item_name: product.name,
      price: product.price,
      quantity: product.quantity || 1
    }]
  });

  // Meta Pixel
  fbq('track', 'Purchase', {
    content_ids: [product.sku],
    content_name: product.name,
    currency: 'USD',
    value: product.price
  });
}

// -----------------------------
// EXAMPLE USAGE
// -----------------------------
// On Product Page:
const product = {
  sku: "SY-2PS-006",
  name: "Classic Black 2-Piece Suit",
  price: 299.99,
  quantity: 1
};
trackProductView(product);

// On Add to Cart button click
document.querySelector("#add-to-cart-btn").addEventListener("click", () => {
  trackAddToCart(product);
});

// On EmailJS order success
// Replace this with your actual EmailJS submission code
function onOrderSuccess() {
  trackPurchase(product);
}
