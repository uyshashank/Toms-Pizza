const db = require('../model/db');
let referer = '/';
exports.HPDriver = (req, res) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;
    db.connect()
        .then((localclient) => {
            db.loadData(localclient)
                .then((data) => {
                    res.render('homepage/home', {
                        data,
                        logStatus,
                        userName
                    });
                })
                .catch((err) => {
                    res.send("Something went wrong!");
                })
        })
}
// Rendering login page
exports.getLogin = (req, res) => {
    referer = req.headers.referer;
    let host = req.headers.host;
    let route = referer.split(host)[1];
    if (referer == null || undefined || route == '/signup' || route == '/login') {
        referer = '/';
    }
    res.render('userAccounts/loginPage');
}
// Handling login page data // Authenticating user
exports.postLogin = (req, res) => {
    let userInfo = req.body;
    db.authenticateUser(userInfo)
        .then((userData) => {
            if (userData.length == 0) {
                res.send("An account with this email id does not exist!");
            } else {
                if (userInfo.email == userData[0].user_email) {
                    if (userInfo.password == userData[0].user_password) {
                        req.session.logStatus = "true";
                        req.session.userName = userData[0].user_fname;
                        req.session.userEmail = userData[0].user_email;
                        res.redirect(referer);
                    } else {
                        res.send("Invalid password");
                    }
                } else {
                    res.send("An account with this email id does not exist!");
                }
            }
        })
        .catch((err) => {
            res.send("Sorry! It's not you, it's us. Something went wrong on our side. Please try after sometime!");
            console.log("Something went wrong in postLogin function in homepage.js file\n" + err);
        })
    // console.log(req);
}
// Logging out
exports.logout = (req, res) => {
    req.session.logStatus = 'false';
    res.redirect('/');
}
// Rendering signup page
exports.getSignup = (req, res) => {
    res.render('userAccounts/signupPage');
}
// Handling signup page data 
exports.postSignup = (req, res) => {
    let userInfo = {};
    userInfo.user_fname = req.body.fname;
    userInfo.user_lname = req.body.lname;
    userInfo.user_email = req.body.email;
    userInfo.user_password = req.body.password;
    // Checking whether user with this email exist or not
    db.checkUserExistence(userInfo)
        .then((userData) => {
            if (userData.length == 0) {
                db.insertUser(userInfo)
                    .then(() => {
                        req.session.logStatus = 'true';
                        req.session.userName = userInfo.user_fname;
                        req.session.userEmail = userInfo.user_email;
                        res.redirect('/');
                    })
                    .catch((err) => {
                        res.send("Sorry! It's not you, it's us. Something went wrong on our side. Please try after sometime!");
                        console.log("Something went wrong in postSignup function in homepage.js file\n" + err);
                    });
            } else {
                res.send("An account with this email id already exist!");
            }
        })
        .catch((err) => {
            res.send("Sorry! It's not you, it's us. Something went wrong on our side. Please try after sometime!");
            console.log("Something went wrong in postSignup function in homepage.js file\n" + err);
        })
}

exports.whatIsLogStatus = (req, res) => {
    res.send(req.session.logStatus);
}

exports.ATC_Handler = (req, res) => {
    const keys = Object.keys(req.body);
    const data = JSON.parse(keys[0]);
    const userID = req.session.userEmail.split('@')[0];

    let cart = {
        pizza: [],
        burgers: [],
        beverages: []
    };
    // Performing check whether the item is pizza or not
    if (typeof data == 'object') {
        cart.pizza.push({
            id: data.itemID,
            size: data.pzaNum
        });
        db.fillCart(cart, 1, userID);
    } else {
        let category = data.split('0')[0];
        //Burger or Beverages?
        if (category == 'bgr') {
            cart.burgers.push({
                id: data
            });
            db.fillCart(cart, 2, userID);
        } else {
            cart.beverages.push({
                id: data
            });
            db.fillCart(cart, 3, userID);
        }
    }
}
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

exports.loadCart = (req, response) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;
    const user_email = String(req.session.userEmail.split('@')[0]);

    let cart = [];

    db.loadCartData(user_email)
        .then((cartData) => {
            let cartPizza = cartData[0].pizza;
            let cartBurgers = cartData[0].burgers;
            let cartBeverages = cartData[0].beverages;

            if (cartPizza.length == 0 && cartBurgers.length == 0 && cartBeverages.length == 0) {
                response.send("No items in cart!")
            } else {
                for (let i = 0; i < cartPizza.length; i++) {
                    db.loadItem(cartPizza[i].id)
                        .then((res) => {
                            let item = res.item;
                            cart.push({
                                id: item.pr_id,
                                name: item.pr_name,
                                info: item.pr_info,
                                price: loadPrice(cartPizza, item.pr_price, i),
                                img: item.pr_img
                            });

                        }).catch((err) => console.log("LoadCartData LN-155 first \'then\' throwing error!\n", err))
                        .then(() => {
                            // After loading pizza now load burgers
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
                                    });
                            }
                        }).catch((err) => console.log("LoadCartData LN-174 second \'then\' throwing error!\n", err))
                        .then(() => {
                            // After loading burgers load beverages
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
                                        })

                                        if (i == cartBeverages.length - 1) {                                            
                                            response.render('cartpage/home', {
                                                logStatus,
                                                userName,
                                                cart
                                            });
                                        }

                                    })
                            }
                        });
                }
                // response.send("hi");
            }


        })
}

exports.loadPizza = (req, res) => {
    res.send("loadPizza");
}

exports.loadBurgers = (req, res) => {
    res.send("loadBurgers");
}

exports.loadBeverages = (req, res) => {
    res.send("loadBeverages");
}