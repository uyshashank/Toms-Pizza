const db = require('../model/db');

exports.IPDriver = (req, res) => {
    let item = req.params.item;
    const logStatus = req.session.logStatus;
    const userName = req.session.userName;    
    db.loadItem(item)
        .then((itemDoc) => {
            res.render('itempage/home', {
                itemDoc,
                logStatus,
                userName
            });
        })
        .catch(err => console.log(err));
}