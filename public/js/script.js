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
    let userID = getCookie('id');
    let cookie = getCookie(userID);
    if (cookie) {        
        let userCookie = JSON.parse(cookie); //Fetching out the user obj        
        let username = userCookie.email.split('@')[0];
        userCookie = pushItems(itemID, WPB, userCookie);
        document.cookie = username + "=" + JSON.stringify(userCookie) + ";path=/";
    } else {
        alert("Cookie does not exist!");
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
                window.location.href = "/login";
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
                window.location.href = "/login";
            }

        });
}

function deleteCartItem(id) {
    event.preventDefault();
    let ID = id.attributes[2].value;
    let PRICE = id.attributes[3].value;
    let SIZE = id.attributes[4].value;
    let ROLL = id.attributes[5].value;
    sendDeleteReq(ID, SIZE);    
    deleteItem(id, PRICE, ROLL);
}

function deleteItem(data, price, roll) {
    let id = 'item' + data.attributes[2].value;    
    let row = "row"+roll;
    let total = document.getElementById('total');
    let prevTotal = parseInt(total.innerText.split('₹')[1]);
    
    document.getElementById(id).style.display = "none";
    updateCookie(data);
    
    document.getElementById(row).style.display = "none";
    total.innerText = "₹".concat(String(prevTotal - parseInt(price)));
}

function updateCookie(data) {
    let userID = getCookie('id');
    let currentCookie = getCookie(userID);
    if (currentCookie) {        
        let cookie = JSON.parse(currentCookie);
        let id = data.attributes[2].value;
        let price = data.attributes[4].value;
        let category = id.split('0')[0];
        let username = cookie.email.split('@')[0];

        if (price) {
            for (let i = 0; i < cookie.pizza.length; i++) {
                if (cookie.pizza[i].id == id && cookie.pizza[i].size == price) {
                    cookie.pizza.pop(i);
                }
            }
        } else {
            if (category == 'bgr') {
                for (let i = 0; i < cookie.burgers.length; i++) {
                    if (cookie.burgers[i].id == id) {
                        cookie.burgers.pop(i);
                    }
                }
            } else {
                for (let i = 0; i < cookie.beverages.length; i++) {
                    if (cookie.beverages[i].id == id) {
                        cookie.beverages.pop(i);
                    }
                }
            }
        }
        document.cookie = username + "=" + JSON.stringify(cookie) + ";path=/";
    } else {
        alert("Cookie doesnt exist! script.js updatecookie fn error");
    }
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
    });
}