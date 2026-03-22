/*function addToCart(btn) {
  const parent = btn.parentElement;

  btn.classList.add("hidden"); // скрываем кнопку
  const counter = parent.querySelector(".counter");
  counter.classList.remove("hidden"); // показываем счётчик
}

function increase(btn) {
  const span = btn.parentElement.querySelector("span");
  let count = parseInt(span.textContent);
  count++;
  span.textContent = count;
}

function decrease(btn) {
  const span = btn.parentElement.querySelector("span");
  let count = parseInt(span.textContent);

  if (count > 1) {
    count--;
    span.textContent = count;
  }
}
let cart = {};

// ➕ Добавить в корзину
function addToCart(button) {
  const container = button.parentElement;
  const counter = container.querySelector(".counter");

  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);

  // добавить товар
  if (!cart[name]) {
    cart[name] = { price: price, quantity: 1 };
  }

  // UI
  button.style.display = "none";
  counter.classList.remove("hidden");

  updateCart();
}

// ➕ Увеличить
function increase(btn) {
  const container = btn.closest(".mt-4");
  const button = container.querySelector("button");
  const name = button.dataset.name;

  cart[name].quantity++;

  btn.parentElement.querySelector("span").innerText = cart[name].quantity;

  updateCart();
}

// ➖ Уменьшить
function decrease(btn) {
  const container = btn.closest(".mt-4");
  const button = container.querySelector("button");
  const name = button.dataset.name;

  if (cart[name].quantity > 1) {
    cart[name].quantity--;

    btn.parentElement.querySelector("span").innerText = cart[name].quantity;
  }

  updateCart();
}

// 🧺 Обновить корзину
function updateCart() {
  let totalItems = 0;
  let totalPrice = 0;

  for (let item in cart) {
    totalItems += cart[item].quantity;
    totalPrice += cart[item].quantity * cart[item].price;
  }

  document.getElementById("cart-count").innerHTML =
    `<strong class="text-xl font-bold">Your Cart (${totalItems}):</strong>`;

  document.getElementById("cart-total").innerText =
    `Order total: $${totalPrice.toFixed(2)}`;
}
function updateCart() {
  let totalItems = 0;
  let totalPrice = 0;

  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // очищаем список

  for (let item in cart) {
    const quantity = cart[item].quantity;
    const price = cart[item].price;

    totalItems += quantity;
    totalPrice += quantity * price;

    // создаём элемент списка
    const li = document.createElement("li");
    li.textContent = `${item} × ${quantity} — $${(price * quantity).toFixed(2)}`;
    cartItemsContainer.appendChild(li);
  }

  document.getElementById("cart-count").innerHTML =
    `<strong class="text-xl font-bold">Your Cart (${totalItems}):</strong>`;
  document.getElementById("cart-total").innerText =
    `Order total: $${totalPrice.toFixed(2)}`;
}*/
let cart = {};

// ➕ Добавить в корзину
/*function addToCart(button) {
  const container = button.parentElement;
  const counter = container.querySelector(".counter");

  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);

  // добавить товар
  if (!cart[name]) {
    cart[name] = { price: price, quantity: 1 };
  } else {
    cart[name].quantity++;
  }

  // UI: скрываем кнопку и показываем счётчик
  button.style.display = "none";
  counter.classList.remove("hidden");
  counter.querySelector("span").innerText = cart[name].quantity;

  updateCart();
}*/

// ➕ Увеличить
function increase(btn) {
  const container = btn.closest(".mt-4");
  const button = container.querySelector("button");
  const name = button.dataset.name;

  cart[name].quantity++;
  btn.parentElement.querySelector("span").innerText = cart[name].quantity;

  updateCart();
}

// ➖ Уменьшить
function decrease(btn) {
  const container = btn.closest(".mt-4");
  const button = container.querySelector("button");
  const name = button.dataset.name;

  if (cart[name].quantity > 1) {
    cart[name].quantity--;
    btn.parentElement.querySelector("span").innerText = cart[name].quantity;
  } else {
    // при 1 — убираем из корзины и показываем кнопку
    delete cart[name];
    const counter = btn.parentElement;
    counter.classList.add("hidden");
    container.querySelector("button").style.display = "flex";
  }

  updateCart();
}

// 🧺 Обновить корзину
function updateCart() {
  let totalItems = 0;
  let totalPrice = 0;

  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // очищаем список

  for (let name in cart) {
    const item = cart[name];
    const quantity = item.quantity;
    const price = item.price;

    totalItems += quantity;
    totalPrice += quantity * price;

    // создаём элемент списка с двумя строками
    const li = document.createElement("li");
    li.className = "mb-3 border-b pb-2";

    li.innerHTML = `
      <div class="flex justify-between font-semibold text-gray-800">
        <span>${name}</span>
        <button onclick="removeFromCart('${name}')" class="text-red-500 font-bold ml-2">✕</button>
      </div>
      <div class="flex justify-between text-gray-600 text-sm mt-1">
        <span>Quantity: ${quantity}</span>
        <span>Price: $${price.toFixed(2)} × ${quantity} = $${(price * quantity).toFixed(2)}</span>
      </div>
    `;

    cartItemsContainer.appendChild(li);
  }

  document.getElementById("cart-count").innerHTML =
    `<strong class="text-xl font-bold">Your Cart (${totalItems}):</strong>`;
  document.getElementById("cart-total").innerText =
    `Order total: $${totalPrice.toFixed(2)}`;
}

// ❌ Удалить из корзины по кнопке
function removeFromCart(name) {
  delete cart[name];

  // показать кнопку Add to Cart на карточке
  const btn = document.querySelector(`button[data-name="${name}"]`);
  if (btn) btn.style.display = "flex";

  // скрыть счётчик на карточке
  const counter = btn.parentElement.querySelector(".counter");
  if (counter) counter.classList.add("hidden");

  updateCart();
}
//Confirm order
function openModal() {
  const modal = document.getElementById("order-modal");
  const list = document.getElementById("modal-items");
  const totalText = document.getElementById("modal-total");

  list.innerHTML = "";

  let total = 0;

  for (let name in cart) {
    const item = cart[name];

    const li = document.createElement("li");
    li.className = "flex items-center gap-3 mb-3";

    li.innerHTML = `
      <img src="${item.image}" class="w-12 h-12 object-cover rounded-md">
      
      <div class="flex-1">
        <p class="font-semibold text-sm">${name}</p>
        <p class="text-xs text-gray-600">
          ${item.quantity} × $${item.price.toFixed(2)}
        </p>
      </div>

      <p class="font-semibold">
        $${(item.quantity * item.price).toFixed(2)}
      </p>
    `;

    list.appendChild(li);

    total += item.quantity * item.price;
  }

  totalText.innerText = `Total: $${total.toFixed(2)}`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

//В addToCart добавь image:
function addToCart(button) {
  const container = button.closest(".dessert-card");
  const counter = container.querySelector(".counter");

  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);
  const image = button.dataset.image;

  if (!cart[name]) {
    cart[name] = { price: price, quantity: 1, image: image };
  } else {
    cart[name].quantity++;
  }

  button.style.display = "none";
  counter.classList.remove("hidden");
  counter.querySelector("span").innerText = cart[name].quantity;

  // 🔴 ВОТ ЭТА СТРОКА ВАЖНАЯ
  container.classList.add("selected");

  updateCart();
}

function decrease(btn) {
  const container = btn.closest(".dessert-card");
  const button = container.querySelector("button[data-name]");
  const name = button.dataset.name;

  if (cart[name].quantity > 1) {
    cart[name].quantity--;
    container.querySelector(".counter span").innerText = cart[name].quantity;
  } else {
    // ❌ удаляем товар
    delete cart[name];

    container.querySelector("button[data-name]").style.display = "flex";
    container.querySelector(".counter").classList.add("hidden");

    // ❌ убираем красную рамку
    container.classList.remove("selected");
  }

  updateCart();
}
