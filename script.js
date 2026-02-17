// 1. Selection of DOM Elements
const quantities = document.getElementsByClassName('quantity');
const orderList = document.getElementById('order-list');
const totalQuantityDisplay = document.getElementById('total-quantity');
const finalPriceDisplay = document.getElementById('final-price');
const cardActions = document.getElementsByClassName('card-actions');


// 2. The "Source of Truth"
let cartData = [];


// 3. Logic for Increment and Decrement Buttons
for (const quantity of quantities) {
    const removeBtn = quantity.querySelector('.remove-item');
    const addBtn = quantity.querySelector('.add-item');
    const displayCount = quantity.querySelector('.product-count');

    addBtn.addEventListener('click', () => {
        let num = parseInt(displayCount.innerText);
        displayCount.innerText = ++num;
    });

    removeBtn.addEventListener('click', () => {
        let num = parseInt(displayCount.innerText);
        if (num > 0) {
            displayCount.innerText = --num;
        }
    });
}

// 4. Function to Re-render the Cart
function renderCart() {
    orderList.innerHTML = "";
    let grandTotalQuantity = 0;
    let grandTotalPrice = 0;

    cartData.forEach(item => {
        const orderDetails = document.createElement('div');
        orderDetails.innerHTML = `
            <div class="grid grid-cols-3 p-2">
                <p>${item.name}</p>
                <p>${item.quantity}</p>
                <p>${item.totalPrice}</p>
            </div>
            <hr>
        `;
        orderList.appendChild(orderDetails);

        grandTotalQuantity += item.quantity;
        grandTotalPrice += item.totalPrice;
    });

    // Update Bottom Totals
    totalQuantityDisplay.innerText = grandTotalPrice;
    finalPriceDisplay.innerText = grandTotalPrice;
}

// 5. Logic for the "Add to Cart" Button
for (const cardAction of cardActions) {
    const displayCount = cardAction.querySelector('.product-count');
    const addToCartBtn = cardAction.querySelector('.btn');
    const priceText = cardAction.parentElement.querySelector('.product-price').innerText;
    const productName = cardAction.parentElement.querySelector('.card-title').innerText;

    addToCartBtn.addEventListener('click', () => {
        const selectedQuantity = parseInt(displayCount.innerText);
        const unitPrice = parseInt(priceText);

        // Validation
        if (selectedQuantity === 0) {
            alert("Please select a quantity first!");
            return;
        }
        // Check if item already exists in the cartData array
        const existingItem = cartData.find(item => item.name === productName);

        if (existingItem) {
            // Update existing record
            existingItem.quantity += selectedQuantity;
            existingItem.totalPrice = existingItem.quantity * unitPrice;
        } else {
            // Add new record
            cartData.push({
                name: productName,
                quantity: selectedQuantity,
                totalPrice: selectedQuantity * unitPrice
            });
        }

        // Reset the UI counter back to zero
        displayCount.innerText = 0;

        // Re-draw the table
        renderCart();
    });
}