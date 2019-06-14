function whatIsLogStatus() {
    return fetch('/logStatus')
        .then(function (response) {
            return response.text();
        })
        .then((text) => {
            return text;
        });
}

function setCookie(itemID, WPB) {
    let cookie = document.cookie;
    if (cookie == '') {
        let cart = {
            pizza: [],
            burgers: [],
            beverages: []
        }
        cart = pushItems(itemID, WPB, cart);
        document.cookie = "cart = " + JSON.stringify(cart);
    } else {
        let data = JSON.parse(cookie.split('=')[1]);
        let newCart = pushItems(itemID, WPB, data);
        document.cookie = "cart = " + JSON.stringify(newCart);
    }
}
//Add to cart to added to cart 
function changeButton() {
    let atcBtn = document.getElementById(id);
    let addedBtn = document.getElementById("addedBtn");
    atcBtn.style.display = "none";
    addedBtn.style.display = "inline-block";
}

function pushItems(itemID, WPB, data) {
    if (WPB) {
        data.pizza.push({
            id: itemID,
            size: WPB
        });
    } else {
        let category = itemID.split('0')[0];
        if (category == 'bgr') {
            data.burgers.push({
                id: itemID
            });
        } else if (category == 'bvg') {
            data.beverages.push({
                id: itemID
            });
        }
    }
    console.log(data);
    return data;
}
// Is it pizza
function isItPizza(id) {
    let category = id.split('0')[0];
    if (category == 'pza')
        return true;
    else
        return false;
}
// ATC functionality starts
function addToCart(id) {
    whatIsLogStatus()
        .then((logStatus) => {
            if (logStatus == 'true') {
                let itemID = id.id;
                if (isItPizza(id.id)) {
                    let price_button = document.querySelectorAll('.price_button');
                    let WPB = whichPriceBtn(price_button);
                    if (WPB == undefined) {
                        alert('Please select the size of pizza!');
                    } else {
                        sendATCrequest(itemID, WPB);
                        setCookie(itemID, WPB);
                        changeButton();
                    }
                } else {
                    sendATCrequest(itemID);
                    setCookie(itemID);
                    changeButton();
                }
            } else {
                alert('Please login first');
            }
        });
}

function sendATCrequest(itemID, pzaNum = 0) {
    let data = {};
    if (pzaNum == 0) {
        data = itemID;
    } else {
        data.itemID = itemID;
        data.pzaNum = pzaNum;
    }
    fetch('/atc', {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }).then(function () {
            // console.log("Response text = ", response.text());

            // return response.text();
        })
        .then(() => {
            // console.log("text = ", text);
            // return text;
        });
}

function whichPriceBtn(price_button) {
    for (let i = 0; i < price_button.length; i++) {
        if (price_button[i].classList.contains('active')) {
            return i + 1;
        }
    }
}

function activate(btn1, btn2, btn3) {
    whatIsLogStatus()
        .then((logStatus) => {
            if (logStatus == 'true') {
                document.getElementById(btn1).classList.add('active');
                document.getElementById(btn2).classList.remove('active');
                document.getElementById(btn3).classList.remove('active');
            } else {
                alert('Please login first');
            }

        });
}

function deleteCartItem(id) {
    event.preventDefault();
    let ID = id.attributes[2].value;
    let SIZE = id.attributes[4].value;
    console.log(id.attributes);
    let response = sendDeleteReq(ID, SIZE);
}

function sendDeleteReq(ID, SIZE) {
    let url;

    if (SIZE == undefined)
        url = '/delete/' + ID;
    else
        url = '/delete/' + ID + '/' + SIZE;

    fetch(url, {
            method: "DELETE",
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then((res) => {
            // This code runs after successfully deleting item from 
            //cart in database.
        })
        .catch((err) => {
            console.log(err);
        })
}
