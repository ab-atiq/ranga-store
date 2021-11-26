// api link - https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json

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
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p><span> Rating: ${product.rating.rate} </span><span class='text-muted'>(${product.rating.count})</span></p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" onclick='detailsShow(${product.id})'data-toggle="modal" data-target="#myModal" class="btn btn-warning">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  // show total value in cart section 
  updateTotal()
  document.getElementById("total-Products").innerText = count;
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
  const total = convertedOldPrice + convertPrice;
   // exact value show --value instead of  Math.round(value) 
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  // exact value show --value instead of  Math.round(value) 
  // toFixed use to show 2 fraction after decimal
  document.getElementById(id).innerText = value.toFixed(2);
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
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// show modal 
const detailsShow =async id =>{
  let data = await fetch(`https://fakestoreapi.com/products/${id}`)
  let res = await data.json()
  displayModal(res)
}
const displayModal =item=>{
  console.log(item)
  let modal = document.getElementById('mod')
  modal.innerHTML =''
  modal.innerHTML = `<div class="modal-header">
  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <h4 class="modal-title" id="myModalLabel">${item.title}</h4>
</div>
<div class="modal-body">
  <img src=${item.image} class='img-responsive' />
  <p>${item.description}</p>
  <p>Category: ${item.category}</p>
  <p><strong>Price : $${item.price}</strong></p>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
  <button type="button" class="btn btn-primary">Save changes</button>
</div>
  `
}