let cookie = document.cookie;
let id = window.location.pathname.split('find/')[1];
let data = JSON.parse(cookie.split('=')[1]);
let category = id.split('0')[0];
let result;

if (cookie) {
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
    pb[size-1].classList.add('active');
}

function warning() {
    alert("Product already in your cart!");
}