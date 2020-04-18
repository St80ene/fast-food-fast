function alignText(className) {
  const el = document.getElementsByClassName(className);
  for (let i = 0; i < el.length; i++) {
    const wordArray = el[i].innerHTML.split(" ");
    while (el[i].scrollHeight > el[i].offsetHeight) {
      wordArray.pop();
      el[i].innerHTML = wordArray.join(" ") + "...";
    }
  }
}

/**creating functions for card */
window.onload = function () {
  let cards = "";
  for (let i = 0; i < foodItem.length; i++) {
    const card = `<div class="card">
    <img
      src="${foodItem[i].image}"
      class="card-img-top burger-pic"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${foodItem[i].name}</h5>
      <p class="card-text">
        ${foodItem[i].description}
      </p>
      <div class="butn">
       <div class="price-tag"><p>₦ ${foodItem[i].price.toFixed(2)}</p></div>
        <button type="button" onclick="addToCart(${i})">Add</button>
      </div>
    </div>
    </div>`;
    cards += card;
  }
  document.getElementById("cards-wrapper").innerHTML = cards;
  alignText("card-text");

  loadCart();
};

/**creating and updating cart items */
const loadCart = () => {
  let cartItems = "";
  let total = 0;
  for (let i = 0; i < cart.items.length; i++) {
    let subTotal =
      foodItem[cart.items[i].foodId].price * cart.items[i].quantity;
    total = subTotal + total;
    const cartItem = ` <div class="cart-add d-flex justify-content-between my-3">
    <div id="cover-wrapper">
      <div id="image-wrapper" onclick="removeFromCart(${cart.items[i].foodId})">
        <div id="order_cancel">X</div>
      </div>
      <img
        src="${foodItem[cart.items[i].foodId].image}"
        id="second-burger"
        alt=""
        srcset=""
      />
    </div>
    <div class="d-flex icon">
      <img
        class="icons"
        src="/assets/img/minus.svg"
        alt=""
        srcset=""
        onclick="updateCart('-', ${i})"
      />
      <p>${cart.items[i].quantity}</p>
      <img
        class="icons"
        src="/assets/img/add.svg"
        alt=""
        srcset=""
        onclick="updateCart('+', ${i})"
      />
    </div>
    <p>₦ ${subTotal.toFixed(2)}</p>
  </div>`;
    cartItems += cartItem;
  }
  document.getElementById("cart-holder").innerHTML = cartItems;
  document.getElementById("t-price").innerHTML = total;
};

/**Adding items to cart */
const addToCart = (id) => {
  const itemIndex = cart.items.findIndex(
    (item) => item.foodId === id
  ); /**getting index of the required food id */
  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity += 1; /**adding items */
  } else {
    cart.items.push({
      foodId: id,
      quantity: 1,
    }); /**checking and adding new items */
  }
  loadCart();
};

/**Removing items from cart */
const removeFromCart = (foodId) => {
  const itemIndex = cart.items.findIndex(
    (item) => item.foodId === foodId
  ); /**finding index of the cart item id */
  cart.items.splice(itemIndex, 1);
  // switch (findItemIndex >= 1) {
  //   case id:
  //     cart.items.splice(0);
  //     break;
  // }
  loadCart();
};

/**updating carts using operators */
const updateCart = (op, id) => {
  // if (op === "+") {
  //   cart.items[id].quantity += 1;
  // } else {
  //   cart.items[id].quantity -= 1;
  // }

  switch (op) {
    case "+":
      cart.items[id].quantity += 1;
      break;

    case "-":
      if (cart.items[id].quantity >= 2) {
        cart.items[id].quantity -= 1;
      }
      break;

    default:
      break;
  }

  loadCart();
};
