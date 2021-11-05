'use strict';

const basketCounter = document.querySelector('.cartIconWrap span');
const basketTotalObjects = document.querySelector('.basketTotal');
const basketTotalCost = document.querySelector('.basketTotalValue');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  document.querySelector('.basket').classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (event.target.classList.contains('addToBasket')) {
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToBasket(id, name, price);
  }
});

function addToBasket(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};
  }
  basket[id].count++;
  basketCounter.textContent = getBasketObjCount().toString();
  basketTotalCost.textContent = getBasketPrice().toFixed(2);
  showBasketStats(id);
}

function getBasketObjCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function showBasketStats(productId) {
  const basketRow = document
    .querySelector(`.basketRow[data-productId="${productId}"]`);
  if (!basketRow) {
    showNewBasketStats(productId);
    return;
  }
  const product = basket[productId];
  basketRow.querySelector('.productCount').textContent = product.count;
  basketRow.querySelector('.productTotalRow').textContent = (product.price * product.count).toFixed(2);
}

function showNewBasketStats(productId) {
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalObjects.insertAdjacentHTML("beforebegin", productRow);
}
