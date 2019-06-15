const db = require('../model/db');
const lc = require('./submodules');
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
                        res.setHeader('Set-Cookie', ["user=" + userData[0].user_email] + ";path=/");
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
                        res.setHeader('Set-Cookie', ["user=" + userInfo.user_email] + ";path=/");
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


// exports.loadCart = (req, response) => {
//     const logStatus = req.session.logStatus;
//     const userName = req.session.userName;
//     const user_email = String(req.session.userEmail.split('@')[0]);

//     let cart = [];

//     db.loadCartData(user_email)
//         .then((cartData) => {
//             let cartPizza = cartData[0].pizza;
//             let cartBurgers = cartData[0].burgers;
//             let cartBeverages = cartData[0].beverages;
//             if (cartPizza.length == 0 && cartBurgers.length == 0 && cartBeverages.length == 0) {
//                 response.send("No items in cart!")
//             } else {

//                 if (cartPizza.length) { //Will only execute if there is any item in pizza array.                    
//                     for (let i = 0; i < cartPizza.length; i++) {
//                         db.loadItem(cartPizza[i].id)
//                             .then((res) => {
//                                 let item = res.item;
//                                 cart.push({
//                                     id: item.pr_id,
//                                     name: item.pr_name,
//                                     info: item.pr_info,
//                                     price: loadPrice(cartPizza, item.pr_price, i),
//                                     img: item.pr_img,
//                                     size: cartPizza[i].size
//                                 });
//                                 // console.log("Talking from cartPizza loop\n");
//                                 // console.log(cart);
//                             }).catch((err) => {
//                                 console.log("LoadCartData LN-155 first \'then\' throwing error!\n", err)
//                             })
//                     } //End of for loop for pizza
//                 }

//                 if (cartBurgers.length) {
//                     for (let i = 0; i < cartBurgers.length; i++) {
//                         db.loadItem(cartBurgers[i].id)
//                             .then((res) => {
//                                 let item = res.item;
//                                 cart.push({
//                                     id: item.pr_id,
//                                     name: item.pr_name,
//                                     info: item.pr_info,
//                                     price: item.pr_price,
//                                     img: item.pr_img
//                                 })
//                                 // console.log("Talking from cartBurgers loop\n");
//                                 // console.log(cart);
//                             });
//                     } //End of loop of cartBurgers                    
//                 }
//                 if (cartBeverages.length) {
//                     for (let i = 0; i < cartBeverages.length; i++) {
//                         db.loadItem(cartBeverages[i].id)
//                             .then((res) => {
//                                 let item = res.item;
//                                 cart.push({
//                                     id: item.pr_id,
//                                     name: item.pr_name,
//                                     info: item.pr_info,
//                                     price: item.pr_price,
//                                     img: item.pr_img
//                                 });                              
//                             })
//                     } //End of for loop of bev
//                 }
//                 setTimeout(() => {
//                     response.render('cartpage/home', {
//                         logStatus,
//                         userName,
//                         cart
//                     });
//                 }, 1000);
//             } //End of main else

//         })
// }

exports.loadCart = (request, response) => {
    const logStatus = request.session.logStatus;
    const userName = request.session.userName;
    const user_email = String(request.session.userEmail.split('@')[0]);



    db.loadCartData(user_email)
        .then((cartData) => {
            let cartPizza = cartData[0].pizza;
            let cartBurgers = cartData[0].burgers;
            let cartBeverages = cartData[0].beverages;

            if (cartPizza.length == 0 && cartBurgers.length == 0 && cartBeverages.length == 0) {
                response.send("No items in cart!")
            } else {

                if (cartPizza.length) {
                    // fetch pizza
                    let cart = [];
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
                            response.send("No items in cart!");
                            // response.render('cartpage/home', {
                            //     logStatus,
                            //     userName,
                            //     cart
                            // });
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