let allProducts = [];

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  });

function renderProducts(products) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';

  products.forEach(product => {
    const discountPercent = Math.round(
      ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
    );

    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" class="product-image" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-details">${product.details}</div>
        <div class="product-pricing">
          <span class="discount-price">₹${product.discountPrice}</span>
          <span class="original-price">₹${product.originalPrice}</span>
          <span class="discount-tag">${discountPercent}% off</span>
        </div>
        <a href="${product.affiliateLink}" class="affiliate-link" target="_blank">Buy Now</a>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

// Filter logic
document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);

function filterProducts() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;

  const filtered = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}
