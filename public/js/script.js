function whatIsLogStatus() {
    return fetch('/logStatus')
        .then(function (response) {
            return response.text();
        })
        .then((text) => {
            return text;
            // console.log("Inside function " + text);
        })

}

function addToCart(id) {
    whatIsLogStatus()
        .then((logStatus) => {
            if (logStatus == 'true') {
                let itemID = id.id;
                // console.log(itemID);
                console.log(itemID + " will be added to cart!");
            } else {
                alert('Please login first');
            }
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
    let price_button = document.querySelectorAll('.price_button');
    whatIsLogStatus()
        .then((logStatus) => {
            if (logStatus == 'true') {
                whichPriceBtn(price_button);
                document.getElementById(btn1).classList.add('active');
                document.getElementById(btn2).classList.remove('active');
                document.getElementById(btn3).classList.remove('active');
            } else {
                alert('Please login first');
            }

        });
}