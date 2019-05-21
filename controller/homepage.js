const db = require('../model/db');

function HPDriver(req, res) {
    db.connect()
        .then((localclient) => {
            db.loadData(localclient)
                .then((data) => {
                    db.loadBurgers()
                        .then((burgers) => {
                            db.loadBeverages()
                                .then((beverages) => {
                                    res.render('homepage/home', {
                                        data,
                                        burgers,
                                        beverages
                                    });
                                    //  localclient.close();
                                })
                        })
                   
                })
                .catch((err) => {
                    res.send("Something went wrong!");
                })
        })
}

module.exports = {
    HPDriver
}