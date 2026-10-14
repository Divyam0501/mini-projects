document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "iPhone", Price: 900 },
    { id: 2, name: "Tshirt", Price: 80 },
    { id: 3, name: "Jeans", Price: 100 }
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list")
  const cartItems = document.getElementById("cart-items")
  const emptyCartMsg = document.getElementById("empty-cart")
  const cartTotalMsg = document.getElementById("cart-total")
  const totalPriceDisplay = document.getElementById("total-price")
  const checkOutBtn = document.getElementById("checkout-btn")

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.Price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.append(productDiv)
  })

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productID = parseInt(e.target.getAttribute("data-id"));
      const product = products.find(p => p.id === productID)
      addToCart(product)
    }
  })
  function addToCart(product) {
    cart.push(product)
    renderCart()
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  function renderCart() {
    cartItems.innerHTML = ""
    let totalPrice = 0

    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden")
      cartTotalMsg.classList.remove("hidden")
      
      cart.forEach((item, index) => {
        totalPrice += item.Price
        const cartItem = document.createElement("div")
        cartItem.innerHTML = `
        ${item.name} - $${item.Price}
        <button data-index="${index}">Delete</button>
        `;
        cartItems.appendChild(cartItem)
        totalPriceDisplay.textContent = `
        $${totalPrice}
        `
      })
    } else {
      emptyCartMsg.classList.remove('hidden')
      // totalPriceDisplay.textContent = "0"
      // totalPriceDisplay.classList.add("hidden")
      cartTotalMsg.classList.add("hidden")
      totalPriceDisplay.textContent = ""

    }
  }
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const remove = parseInt(e.target.getAttribute("data-id"));
      const index = parseInt(e.target.dataset.index)
      cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart()
    }
  })


  checkOutBtn.addEventListener("click", () => {
    cart.length = 0
    localStorage.removeItem("cart")
    alert("checkout successfully")
    renderCart()
  })

  renderCart(); // Render/display the cart's current array immediately when the page loads.
}) 