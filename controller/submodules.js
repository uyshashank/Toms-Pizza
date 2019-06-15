const db = require('../model/db');

// Loading price for any one selected size of pizza
function loadPrice(pza, price, i) {
    if (pza[i].size == 1) {
        return price.size_reg;
    } else if (pza[i].size == 2) {
        return price.size_med;
    } else if (pza[i].size == 3) {
        return price.size_lrg;
    }
}

exports.fetchPizza = (cartPizza) => {
    return new Promise(function (resolve, reject) {
        let cart = [];
        for (let i = 0; i < cartPizza.length; i++) {
            db.loadItem(cartPizza[i].id)
                .then((res) => {
                    let item = res.item;
                    cart.push({
                        id: item.pr_id,
                        name: item.pr_name,
                        info: item.pr_info,
                        price: loadPrice(cartPizza, item.pr_price, i),
                        img: item.pr_img,
                        size: cartPizza[i].size
                    });
                })
                .then(() => {
                    if (i == cartPizza.length - 1) {
                        resolve(cart);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        } //End of for loop for pizza
    })

}

exports.fetchBurgers = (cartBurgers) => {
    let cart = [];
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < cartBurgers.length; i++) {
            db.loadItem(cartBurgers[i].id)
                .then((res) => {
                    let item = res.item;
                    cart.push({
                        id: item.pr_id,
                        name: item.pr_name,
                        info: item.pr_info,
                        price: item.pr_price,
                        img: item.pr_img
                    })
                })
                .then(() => {
                    if (i == cartBurgers.length - 1) {
                        resolve(cart);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        } //End of loop of cartBurgers
    })
}

exports.fetchBeverages = (cartBeverages) => {
    let cart = [];
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < cartBeverages.length; i++) {
            db.loadItem(cartBeverages[i].id)
                .then((res) => {
                    let item = res.item;
                    cart.push({
                        id: item.pr_id,
                        name: item.pr_name,
                        info: item.pr_info,
                        price: item.pr_price,
                        img: item.pr_img
                    });
                })
                .then(() => {
                    if (i == cartBeverages.length - 1) {
                        resolve(cart);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        } //End of for loop of bev
    })
}