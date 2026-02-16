const quantities = document.getElementsByClassName('quantity');
for (const quantity of quantities) {
    const removeItems = quantity.children[0];
    const productQuantity = quantity.children[1];
    const addItems = quantity.children[2];

    addItems.addEventListener('click', function () {
        let num = parseInt(productQuantity.innerText);
        num++;
        productQuantity.innerText = num;
    })

    removeItems.addEventListener('click', function () {
        let num = parseInt(productQuantity.innerText);
        if (num > 0) {
            num--
        }
        productQuantity.innerText = num;
    })
}

const cardActions = document.getElementsByClassName('card-actions');
const orderList = document.getElementById('order-list');
const totalPriceContainer = document.getElementById('total-price');
const totalQuantityContainer = [];
const priceContainer = [];

for (const cardAction of cardActions) {
    const quantity = cardAction.children[0].children[1];
    const addToCartBtn = cardAction.children[1];
    const price = cardAction.parentElement.children[1];
    const productName = cardAction.parentElement.children[0].innerText;
    addToCartBtn.addEventListener('click', function () {
        const productQuantity = parseInt(quantity.innerText);
        if (productQuantity === 0) {
            alert("Please select a quantity first!");
            return;
        }
        totalQuantityContainer.push(productQuantity);
        const productPrice = parseInt(price.innerText);
        const finalProductPrice = productPrice * productQuantity;
        priceContainer.push(finalProductPrice);
        const orderDetails = document.createElement('div');
        orderDetails.innerHTML = `
                <div class="grid grid-cols-3">
                    <p>${productName}</p>
                    <p>${productQuantity}</p>
                    <p>${finalProductPrice}</p>
                </div>
                <hr>
                `
        orderList.appendChild(orderDetails);
        // price section
        let finalQuantity = 0;
        let finalPrice = 0;
        for (const totalQuantity of totalQuantityContainer) {
            finalQuantity += totalQuantity;
        }
        for (const productPrice of priceContainer) {
            finalPrice += productPrice;
        }
        totalPriceContainer.children[1].innerText = finalQuantity;
        totalPriceContainer.children[2].innerText = finalPrice;
    })
}