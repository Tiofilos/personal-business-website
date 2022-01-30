

fetch('https://multitierproduct.herokuapp.com/products').then((data) => {
   return data.json();
 }).then((completedata)=>{
    let data1="";
    completedata.map((values)=>{
        data1+=`<div class="product-box">
        <img src=${values.imageUrl} alt="image" class="product-img">
        <h2 class="product-title">${values.name}</h2>
        <span class="price">€${values.price}</span>
        <i class='bx bx-shopping-bag add-cart'></i>
        </div>`;
    });
document.getElementById("shop-content").innerHTML=data1;
}).catch((err)=>{
    console.log(err);
})


let product = localStorage.getItem("product");
if (!product){
fetch('https://multitierproduct.herokuapp.com/products').then((data) => {
   return data.json();
 }).then((completedata)=>{
    localStorage.setItem("product", JSON.stringify(completedata));
    let data2="";
    completedata.map((values)=>{
        data2+=`<div class="cart-box">
        <img src=${values.imageUrl} alt="image" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${values.name}</div>
        <div class="cart-price">€${values.price}</div>
        <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
        </div>`;
    });
document.getElementById("cart-content").innerHTML=data2;
}).catch((err)=>{
    console.log(err);
})
} else {
     product = JSON.parse(product)
       let data2="";
       product.map((values)=>{
        data2+=`<div class="cart-box">
        <img src=${values.imageUrl} alt="image" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${values.name}</div>
        <div class="cart-price">€${values.price}</div>
        <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove' ></i>
        </div>`;    
       });
       document.getElementById("cart-content").innerHTML=data2;
    }
    

//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//cart Working
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

//Functions
function ready(){
    //removing items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.lenght; i++){
    var button = removeCartButtons[i]
    button.addEventListener("click", removeCartItem);
    }
    //Change quantity
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for(var i = 0; i < quantityInputs.lenght; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Adding to cart
    var addCart = document.getElementsByClassName('add-cart')
    for(var i = 0; i < addCart.lenght; i++){
        var button = addCart[i]
        buttin.addEventListener("click", addCartClicked);
    }
}
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//Add to cart (ctd)
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    console.log(title);
}

//Quantity changes
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    } 
    updateTotal();
}

//Updating total
function updateTotal () {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0
    for(var i = 0; i < cartBoxes.lenght; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("€",""));
        var quantity= quantityElement.value;
        total = total + (price * quantity);
        //price with pennys value
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "€" + total;
    }
}