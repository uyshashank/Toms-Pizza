const db = require('../model/db');
exports.HPDriver = (req, res) => {
    db.connect()
        .then((localclient) => {
            db.loadData(localclient)
                .then((data) => {
                    res.render('homepage/home', { data });
                    localclient.close();
                })
                .catch((err) => {
                    res.send("Something went wrong!");
                })
        })
}