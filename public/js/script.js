function whatIsLogStatus() {
    return fetch('/logStatus')
        .then(function (response) {
            return response.text();
        })
        .then((text) => {
            return text;
        });

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
                    }
                } else {
                    sendATCrequest(itemID);
                }
            } else {
                alert('Please login first');
            }
        });
}
// Is it pizza
function isItPizza(id) {
    let category = id.split('0')[0];
    if (category == 'pza')
        return true;
    else
        return false;
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
            headers: {
                'Accept': 'application/json',                
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(data)
        }).then(function (response) {
            return response.text();
        })
        .then((text) => {
            return text;
        })
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