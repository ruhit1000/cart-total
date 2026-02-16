const quantities = document.getElementsByClassName('quantity');
for (const quantity of quantities) {
    const removeItems = quantity.querySelector('.remove-item');
    const productQuantity = quantity.querySelector('.product-count');
    const addItems = quantity.querySelector('.add-item');

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
    const quantity = cardAction.querySelector('.product-count');
    const addToCartBtn = cardAction.querySelector('.btn');
    const price = cardAction.parentElement.querySelector('.product-price');
    const productName = cardAction.parentElement.querySelector('.card-title').innerText;
    addToCartBtn.addEventListener('click', function () {
        const productQuantity = parseInt(quantity.innerText);
        quantity.innerText = 0;
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
        totalPriceContainer.querySelector('#total-quantity').innerText = finalQuantity;
        totalPriceContainer.querySelector('#final-price').innerText = finalPrice;
    })
}