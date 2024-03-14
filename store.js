var removeItem = document.getElementsByClassName('remove-button')
for (var i = 0; i < removeItem.length; i++){
    var button = removeItem[i]
    button.addEventListener('click', removeCartItem)    
}
    
var quantityInputs = document.getElementsByClassName('input-qty')
for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', changingQuantity)
}

var addToCartButtons = document.getElementsByClassName('addCart-button')
for(var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}


function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function changingQuantity(event){
    var input = event.target
    if(isNaN(input.value)|| input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price){
    var cartDetails = document.createElement('div')
    cartDetails.classList.add('cart-information')
    var cartTitles = document.getElementsByClassName('cart-items')[0]
    var cartCategory = cartTitles.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartCategory.length; i++) {
        if (cartCategory[i].innerText == title) {
            alert('This item is in the cart')
            return
        }
    }
    var cartDetailsContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <div class="cart-quantity cart-column">
            <input class="input-qty" type="number" value="1">
            <button class="remove-button" type="button">REMOVE</button>
        </div>
        <span class="cart-price cart-column">RM${price}</span>`
    cartDetails.innerHTML = cartDetailsContents
    cartTitles.append(cartDetails)
    cartDetails.getElementsByClassName('remove-button')[0].addEventListener('click', removeCartItem)
    cartDetails.getElementsByClassName('input-qty')[0].addEventListener('change', changingQuantity)

}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartDetails = cartItemContainer.getElementsByClassName('cart-information')

    var total = 0
    for (var i = 0; i < cartDetails.length; i++){
        var cartDetail = cartDetails[i]
        var priceElement = cartDetail.getElementsByClassName('cart-price')[0]
        var quantityElement = cartDetail.getElementsByClassName('input-qty')[0]
        var price = (priceElement.innerText.replace('RM', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText ='RM' + total
}

var contactForm = document.getElementById('contact-form');
var username = document.getElementById('username');
var email = document.getElementById('email');
var userMessage = document.getElementById('contact-message');

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    validateInputs();
});

function setError (element, message) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

function setSuccess (element) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function isValidName(username){
    var validNameRegex = /^[A-Za-z]*\.?\s([A-Za-z]+\.?\s?)+$/i;
    return validNameRegex.test(String(username).toLowerCase())
}

function isValidEmail(email){
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
}

function validateInputs(){
    var usernameValue = username.value.trim();
    var emailValue = email.value.trim();
    var messageValue = userMessage.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    }else if(!isValidName(usernameValue)){
        setError(username, 'Name is invalid');
    }else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(messageValue === '') {
        setError(userMessage, 'Message is required');
    } else {
        setSuccess(userMessage);
    }

}