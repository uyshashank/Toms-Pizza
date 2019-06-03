const db = require('../model/db');
exports.HPDriver = (req, res) => {
    const logStatus = req.session.logStatus;
    db.connect()
        .then((localclient) => {
            db.loadData(localclient)
                .then((data) => {
                    res.render('homepage/home', {
                        data,
                        logStatus
                    });
                })
                .catch((err) => {
                    res.send("Something went wrong!");
                })
        })
}
// Rendering login page
exports.getLogin = (req, res) => {    
    res.render('userAccounts/loginPage');    
}
// Handling login page data // Authenticating user
exports.postLogin = (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    req.session.logStatus = "true";
    res.redirect('/');
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
    res.redirect('/');
}
