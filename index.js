const addButtons = document.querySelectorAll('.add-btn');
const selectedList = document.querySelector('.selected-products');
const progressText = document.querySelector('.progress-text');
const progressBar = document.querySelector('.progress-bar span');
const discountAmountEl = document.querySelector('.discount-amount');
const subtotalPriceEl = document.querySelector('.subtotal-price');
const ctaBtn = document.querySelector('.cta-btn');

let selectedProducts = [];


function updateSidebar() {
  
  selectedList.innerHTML = '';

  let subtotal = 0;
  selectedProducts.forEach(product => {
    subtotal += product.price;

    const li = document.createElement('li');
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";

    li.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${product.img}" alt="${product.name}" 
             style="width:40px;height:40px;object-fit:cover;border:1px solid #ddd;">
        <span>${product.name}</span>
      </div>
      <span>$${product.price}</span>
    `;

    selectedList.appendChild(li);
  });

 
  progressText.textContent = `${selectedProducts.length}/3 added`;
  progressBar.style.width = `${Math.min((selectedProducts.length / 3) * 100, 100)}%`;

  
  let discount = selectedProducts.length >= 3 ? subtotal * 0.3 : 0;
  const totalAfterDiscount = subtotal - discount;

  discountAmountEl.textContent = discount > 0
    ? `- $${discount.toFixed(2)} (30%)`
    : `- $0.00 (0%)`;
  subtotalPriceEl.textContent = `$${totalAfterDiscount.toFixed(2)}`;

  
  ctaBtn.disabled = selectedProducts.length < 3;
}


addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const img = card.dataset.img;

    const index = selectedProducts.findIndex(p => p.id === id);
    if (index >= 0) {
      
      selectedProducts.splice(index, 1);
      button.classList.remove('added');
      button.textContent = 'Add to Bundle +';
    } else {
     
      selectedProducts.push({ id, name, price, img });
      button.classList.add('added');
      button.textContent = 'Added ✓';
    }

    updateSidebar();
  });
});


ctaBtn.addEventListener('click', () => {
  console.log('Selected Bundle:', selectedProducts);
  alert('Bundle added to cart (simulation)');
});


updateSidebar();
