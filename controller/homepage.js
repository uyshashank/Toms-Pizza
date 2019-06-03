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
                    localclient.close();
                })
                .catch((err) => {
                    res.send("Something went wrong!");
                })
        })
}

exports.getLogin = (req, res) => {    
    res.render('userAccounts/loginPage');    
}

exports.postLogin = (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    
    req.session.logStatus = "true";
    res.redirect('/');
}
exports.logout = (req, res) => {
    req.session.logStatus = 'false';
    res.redirect('/');
}