const db = require('../model/db');
const lc = require('./submodules');
const { validationResult } = require("express-validator");

let referer = '/';
exports.HPDriver = (req, res) => {
    db.connect()
        .then((localclient) => {
            db.loadData(localclient)
                .then((data) => {
                    const logStatus = req.session.logStatus;
                    const userName = req.session.userName;
                    res.render('homepage/home', {
                        data,
                        logStatus,
                        userName
                    });
                })
                .catch((err) => {
                    console.log("HPDriver function homepage.js");
                    console.log(err);
                    res.send("Error, See logs");
                })
        })
}
// Rendering login page
exports.getLogin = (req, res) => {
    referer = req.headers.referer;
    if (referer == null || referer == undefined) {
        referer = '/';
    } else {
        let host = req.headers.host;
        let route = referer.split(host)[1];
        if (route == '/signup' || route == '/login') {
            referer = '/';
        }
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
                        let username = userData[0].user_email.split('@')[0];
                        db.loadCartData(username)
                            .then((data) => {
                                delete data[0]._id;
                                delete data[0].id;
                                data[0].email = userData[0].user_email;
                                res.setHeader('Set-Cookie', [username + "=" + JSON.stringify(data[0]) + ";path=/"]);
                                res.cookie("id", username);
                                res.redirect(referer);
                            })
                            .catch((err) => {
                                console.log("Error at postlogin\n");
                                console.log(err);
                                res.send("Sorry, Something went wrong!");
                            })

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
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(errors.array());
    }
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
                        let username = userInfo.user_email.split('@')[0];
                        let userID = username;
                        let usersCookieArray = {
                            pizza: [],
                            burgers: [],
                            beverages: [],
                            email: userInfo.user_email
                        }
                        res.setHeader('Set-Cookie', [username + "=" + JSON.stringify(usersCookieArray) + ";path=/"]);
                        res.cookie("id", userID);
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
    res.send("hi");
}

exports.loadCart = (request, response) => {
    const logStatus = request.session.logStatus;
    const userName = request.session.userName;
    const user_email = String(request.session.userEmail.split('@')[0]);

    db.loadCartData(user_email)
        .then((cartData) => {
            let cartPizza = cartData[0].pizza;
            let cartBurgers = cartData[0].burgers;
            let cartBeverages = cartData[0].beverages;
            let cart = [];
            if (cartPizza.length == 0 && cartBurgers.length == 0 && cartBeverages.length == 0) {
                response.render('cartpage/home', {
                    logStatus,
                    userName,
                    cart
                });
            } else {

                if (cartPizza.length) {
                    // fetch pizza                    
                    lc.fetchPizza(cartPizza)
                        .then((pza_cart) => {
                            if (cartBurgers.length) {
                                lc.fetchBurgers(cartBurgers)
                                    .then((bgr_cart) => {
                                        if (cartBeverages.length) {
                                            lc.fetchBeverages(cartBeverages)
                                                .then((bvg_cart) => {
                                                    cart = pza_cart.concat(bgr_cart).concat(bvg_cart);
                                                    response.render('cartpage/home', {
                                                        logStatus,
                                                        userName,
                                                        cart
                                                    });
                                                })
                                        } else {
                                            cart = pza_cart.concat(bgr_cart);
                                            response.render('cartpage/home', {
                                                logStatus,
                                                userName,
                                                cart
                                            });
                                        }
                                    })
                            } else {
                                if (cartBeverages.length) {
                                    lc.fetchBeverages(cartBeverages)
                                        .then((bvg_cart) => {
                                            cart = pza_cart.concat(bvg_cart);
                                            response.render('cartpage/home', {
                                                logStatus,
                                                userName,
                                                cart
                                            });
                                        })
                                } else {
                                    cart = pza_cart;
                                    response.render('cartpage/home', {
                                        logStatus,
                                        userName,
                                        cart
                                    });
                                }
                            }
                        });
                } else {
                    if (cartBurgers.length) {
                        lc.fetchBurgers(cartBurgers)
                            .then((bgr_cart) => {
                                if (cartBeverages.length) {
                                    lc.fetchBeverages(cartBeverages)
                                        .then((bvg_cart) => {
                                            cart = bgr_cart.concat(bvg_cart);
                                            response.render('cartpage/home', {
                                                logStatus,
                                                userName,
                                                cart
                                            });
                                        })
                                } else {
                                    cart = bgr_cart;
                                    response.render('cartpage/home', {
                                        logStatus,
                                        userName,
                                        cart
                                    });
                                }
                            });
                    } else {
                        if (cartBeverages.length) {
                            lc.fetchBeverages(cartBeverages)
                                .then((bvg_cart) => {
                                    cart = bvg_cart;
                                    response.render('cartpage/home', {
                                        logStatus,
                                        userName,
                                        cart
                                    });
                                })
                        } else {
                            // response.send("No items in cart!");
                            response.render('cartpage/home', {
                                logStatus,
                                userName,
                                cart
                            });
                        }
                    }
                }

                // if (cartBeverages.length) {
                //     // fetch beverages
                //     cart = lc.fetchBeverages(cartBeverages);
                // }



            } //End of main else

        })
}



exports.loadPizza = (req, res) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;

    db.loadCategoryItem()
        .then((fullData) => {
            let data = fullData[0].pizza;
            data.push({
                "heading": "Delicious Pizza",
                "category": "pizza"
            });
            res.render('categorypage/home', {
                logStatus,
                userName,
                data
            });
        })
        .catch((err) => {
            console.log("Error at LoadPizza function near LN-226 in homepage.js file\n", err);
        });
}

exports.loadBurgers = (req, res) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;

    db.loadCategoryItem()
        .then((fullData) => {
            let data = fullData[1].burgers;
            data.push({
                "heading": "Crispy Burgers",
                "category": "burgers"
            });
            res.render('categorypage/home', {
                logStatus,
                userName,
                data
            });
        })
        .catch((err) => {
            console.log("Error at LoadBurgers function near LN-243 in homepage.js file\n", err);
        });
}

exports.loadBeverages = (req, res) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;

    db.loadCategoryItem()
        .then((fullData) => {
            let data = fullData[2].beverages;
            data.push({
                "heading": "Cool Beverages",
                "category": "beverages"
            });
            res.render('categorypage/home', {
                logStatus,
                userName,
                data
            });
        })
        .catch((err) => {
            console.log("Error at LoadBeverages function near LN-260 in homepage.js file\n", err);
        });
}

exports.loadCheckoutpage = (req, res) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;
    res.render('checkoutpage/home', {
        logStatus,
        userName
    });
}

exports.loadFinalPage = (req, res) => {
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;
    res.render('checkoutpage/finalPageHandler', {
        logStatus,
        userName
    });
}