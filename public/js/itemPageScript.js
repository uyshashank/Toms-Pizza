function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let userID = getCookie('username');

let cookie = getCookie(userID);
console.log(cookie);
let userCookie = JSON.parse(cookie); //Fetching out the user obj

let username = userCookie.email.split('@')[0];

let id = window.location.pathname.split('find/')[1];
let result;
let category = id.split('0')[0];

if (category == 'pza') {
    result = userCookie.pizza.find((item) => {
        return item.id == id
    });
} else if (category == 'bgr') {
    result = userCookie.burgers.find((item) => {
        return item.id == id
    });
} else if (category == 'bvg') {
    result = userCookie.beverages.find((item) => {
        return item.id == id
    });
}
if (result) {
    changeButton();
    if (result.size) {
        activeButton(result.size);
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