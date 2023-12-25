import data from "./data.js";
import { addLocal, removeLocal } from "./save.js";

const products = document.querySelector(".products");
const cartELM = document.querySelector(".cart");
const totalePrice = document.querySelector(".total_price");

const oldCart = getData("cart");
const cart = oldCart ? oldCart : [];

const setTotalePrice = () => {
  totalePrice.innerHTML = cart?.reduce((a, b) => a + b.userPrice, 0) + " $";
};

const renderProduct = () => {
  products.innerHTML = data?.map((product) => {
    `
        <div class="card">
            <div>
                <img src="${product.image}" alt=""/>
            </div>
            <div>
                <h1>${product.name}</h1>
                <h5>${product.price}</h5>
                <strong>${
                  product.count > 0 ? product.count : "Mavjud emas :)"
                }</strong>
                <button data-add="${product.id}">Add</button>
            </div>
        </div>
        `;
  });
};
renderProduct();

const renderCart = () => {
  cartELM.innerHTML = cart?.map((item) => {
    `
        <div class="card">
            <div>
                <img src="${item.img}" alt="" />
            </div>
            <div>
                <h1>${item.name}</h1>
                <p>${item.userPrice} $</p>
                <button data-increment="${item.id}">+</button>
                <strong>${item.userCount}</strong> 
                <button data-decrement="${item.id}">-</button>
            </div>
        </div>
    `;
  });
  addLocal("cart", cart);
  setTotalePrice();
};
renderCart();

products.addEventListener("click", (e) => {
  const { add: id } = e.target.dataset;
  if (id) {
    const newELM = data.find((item) => item.id === Number(id));
    const product = data.find((item) => item.id === Number(id));
    if (!product) {
      cart.push({ ...newELM, userPrice: newELM.price, userCount: 1 });
      newELM.count -= 1;
    }
  }
  renderCart();
  renderProduct();
});

cartELM.addEventListener("click", (e) => {
  const incID = Number(e.target.dataset.increment);
  const decID = Number(e.target.dataset.decrement);

  const product = data?.find((item) => item.id == decID || incID == item.id);

  if (incID) {
    if (product.count > 0) {
      for (let i of cart) {
        if (i.id === incID) {
          i.userCount += 1;
          i.userPrice = i.userCount * i.price;
          product.count -= 1;
        }
      }
    }
  }
  if (decID) {
    for (let n of cart) {
      if (n.id === decID && i.userCount > 0) {
        n.userCount -= 1;
        n.userPrice = n.userCount * n.price;
        product.count += 1;
      }
      if (i.userCount == 0) {
        cart.forEach((item, index) =>
          item.userCount == 0 ? cart.splice(index, 1) : 0
        );
      }
    }
  }
  renderCart();
  renderProduct();
});

