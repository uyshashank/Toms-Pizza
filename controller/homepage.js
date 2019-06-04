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
    console.log("Post login request\n");
    console.log(req);
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
    // console.log("Before setting = ");
    console.log(req.session.NickName);
req.session.NickName = 'Harry';
// console.log(req);
    // console.log("After setting = ");
    // console.log(req.session.NickName);
    
    //     const keys = Object.keys(req.body);
    //     const data = JSON.parse(keys[0]);
    //     const sessionCart = req.session.cart;
    // console.log("sessionCart = " + sessionCart + "\n");
    //     if (req.session.cart == undefined) {
    //         console.log("Inside if undefined");
    //         let cart = {
    //             pizza: [],
    //             burgers: [],
    //             beverages: []
    //         };
    //         if (typeof data == 'object') {
    //             cart.pizza.push({
    //                 id: data.itemID,
    //                 size: data.pzaNum
    //             });            
    //             req.session.cart = cart;
    //         } else {
    //             let category = data.split('0')[0];
    //             if (category == 'bgr') {
    //                 cart.burgers.push({
    //                     id: data
    //                 })
    //                 req.session.cart = cart;
    //             } else {
    //                 cart.beverages.push({
    //                     id: data
    //                 })
    //                 req.session.cart = cart;
    //             }
    //         }        
    //         console.log("Inside if => ");
    //         console.log(cart);
    //     }else{
    //         let cart = req.session.cart;
    //         console.log("Inside else = " + cart);
    //     }

    // Inserting data into cart
    // console.log(cart);

    // req.session.cartItem = {

    // }
}