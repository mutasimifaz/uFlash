const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    //by destructuring product object
    const { rate, count } = product.rating

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5>Total-Rating : ${count}   </h5>
      <h6>Average-rating: ${rate}</h6>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick='showDetails(${product.id})' class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);

  }
};
const showDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => productDetails(data))
}

const productDetails = (product) => {

  const productTitle = document.getElementById('product-title')
  productTitle.innerText = `${product.title}`
  const modalImage = document.getElementById('modal-img')
  modalImage.src = `${product.image}`

  const productCategory = document.getElementById('catagory')
  productCategory.innerText = `${product.category}`
  const productRatings = document.getElementById('rating')
  productRatings.innerText = `${product.rating.rate}`
  const productPrice = document.getElementById('product-price')
  productPrice.innerText = `$${product.price}`

  const productDescription = document.getElementById('product-description')
  productDescription.innerText = `${product.description}`


}


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // console.log(price, typeof price)

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  // const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  console.log(total, typeof total)
  //  document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {

  console.log(
    getInputValue("price"),
    getInputValue("delivery-charge"),
    getInputValue("total-tax")
  );

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};