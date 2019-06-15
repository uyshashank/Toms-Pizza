let cookie = document.cookie;
let username = cookie.split('@')[0];
let check = cookie.split(username + "cart=")[1];
let cartExist = false;

if (check)
    cartExist = false;
else
    cartExist = true;

let id = window.location.pathname.split('find/')[1];
let result;

if (cartExist) {
    let data = JSON.parse(cookie.split(username + 'cart=')[1]);
    let category = id.split('0')[0];
    if (category == 'pza') {
        result = data.pizza.find((item) => {
            return item.id == id
        });
    } else if (category == 'bgr') {
        result = data.burgers.find((item) => {
            return item.id == id
        });
    } else if (category == 'bvg') {
        result = data.beverages.find((item) => {
            return item.id == id
        });
    }
    if (result) {
        changeButton();
        if (result.size) {
            activeButton(result.size);
        }
    }
}

function changeButton() {
    let atcBtn = document.getElementById(id);
    let addedBtn = document.getElementById("addedBtn");
    atcBtn.style.display = "none";
    addedBtn.style.display = "inline-block";
}

function activeButton(size) {
    let pb = document.querySelectorAll('.price_button');
    pb[size - 1].classList.add('active');
    pb[size - 1].style.color = "white";
}

function warning() {
    alert("Product already in your cart!");
}