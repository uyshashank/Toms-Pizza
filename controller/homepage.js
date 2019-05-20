const db = require('../model/db');
let localclient;

function HPDriver(req, res) {
    db.connect()
        .then((localclient) => {
            db.loadData(localclient)
                .then((data) => {
                    res.render('homepage/home', {data});
                })
                .catch((err) => {
                    res.send("Something went wrong!");
                })
        })
}

module.exports = {
    HPDriver
}