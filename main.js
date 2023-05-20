

const cartAmount = document.getElementById("cart-amount");
const cart = document.getElementById("cart");
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const title = document.getElementById("title");

hamburger.addEventListener("click", function(){
    hamburger.classList.toggle("toggle");
    cart.classList.toggle("toggle");
    cartAmount.classList.toggle("toggle");
    menu.classList.toggle("toggle");
    title.classList.toggle("toggle");
})

// Clothing Store Data


const addToCartButton = document.querySelectorAll(".add-to-cart");
let basket = JSON.parse(sessionStorage.getItem("basket")) || [];

addToCartButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = btn.parentElement;
    let img = card.querySelector("img").getAttribute("src");
    let name = card.querySelector("h3").innerHTML;
    let price = card.querySelector("h4").innerHTML;

    let item = { img, name, price };
    basket.push(item);
    btn.disabled = true;
    btn.classList.add("addedToCart");
    btn.innerHTML = "Added to cart";
    
    sessionStorage.setItem("basket", JSON.stringify(basket));
  });
});

// Update button states on page load
addToCartButton.forEach((btn) => {
  let name = btn.parentElement.querySelector("h3").innerHTML;
  if (basket.some(item => item.name === name)) {
    btn.disabled = true;
    btn.classList.add("addedToCart");
    btn.innerHTML = "Added to cart";
  }
});



const savedItems = JSON.parse(sessionStorage.getItem("basket"));
const cartContainer = document.getElementById("cart-container");



if(savedItems){
   
    for(let i = 0;i < savedItems.length; i ++){
        let item = savedItems[i];
        let itemsContainer = document.createElement("div");
        itemsContainer.classList.add("items-container");
        

        let imgEl = document.createElement("img");
        let img = item.img;
        imgEl.src = img;
        imgEl.classList.add("cart-img");
        itemsContainer.appendChild(imgEl);
        cartContainer.appendChild(itemsContainer);
       

        let nameEl = document.createElement("h1");
        nameEl.classList.add("cart-name");
        let name = item.name;
        nameEl.innerHTML = name;
        nameEl.classList.add("item-name");
        itemsContainer.appendChild(nameEl);
        cartContainer.appendChild(itemsContainer);
        
    

        let priceEl = document.createElement("h1");
        priceEl.classList.add("cart-price");
        let price = item.price;
        priceEl.innerHTML = price;
        priceEl.classList.add("item-price");
        itemsContainer.appendChild(priceEl);
        cartContainer.appendChild(itemsContainer);

        
        let itemAmount = document.createElement("input");
        itemAmount.type = "number";
        itemAmount.classList.add("item-amount");
        itemsContainer.appendChild(itemAmount);
        let totalAmount = document.getElementById("total");
        
        let total = 0;
        itemAmount.addEventListener("input", function(){
            if(itemAmount.value <= 0){
                itemAmount.value = 1;
            }
           
         if (itemAmount.value) {
            let itemAmounts = document.querySelectorAll(".item-amount");
            let allprices = [];
            itemAmounts.forEach((amount) =>{
                let priceEl = amount.previousElementSibling;
                let price = priceEl.innerHTML;
                let dollarAmount = price.substring(1);
                let pricePerItem = parseInt(dollarAmount) * amount.value;
                allprices.push(pricePerItem);
            })

            let totaPrice = allprices.reduce((sum, value) => sum + value, 0);
            let theTotal = Math.max(totaPrice);
            total = theTotal;
            totalAmount.innerHTML = "Your total is: " + "$" + total;
          }  

        })

        cartContainer.appendChild(itemsContainer);

        let removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-button");
        removeBtn.innerHTML = "Remove";
        itemsContainer.appendChild(removeBtn);
        cartContainer.appendChild(itemsContainer);
        

        removeBtn.addEventListener("click", function(){
            itemsContainer.remove();
            sessionStorage.removeItem("basket");

            let itemAmounts = document.querySelectorAll(".item-amount");
            let allprices = [];
            itemAmounts.forEach((amount) =>{
                let priceEl = amount.previousElementSibling;
                let price = priceEl.innerHTML;
                let dollarAmount = price.substring(1);
                let pricePerItem = parseInt(dollarAmount) * amount.value;
                allprices.push(pricePerItem);
            })
            let totaPrice = allprices.reduce((sum, value) => sum + value, 0);
            let theTotal = Math.max(totaPrice);
            total = theTotal;
            totalAmount.innerHTML = "Your total is: "+ "$" + total;
            if(total === 0){
                totalAmount.innerHTML = "";
            }
        });
    }
}else{
    let noItemsMessage = document.createElement("h1");
    noItemsMessage.classList.add("cart-message");
    noItemsMessage.innerHTML = "Cart Empty";
    cartContainer.appendChild(noItemsMessage);
}
