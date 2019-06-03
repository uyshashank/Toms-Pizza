const db = require('../model/db');

exports.IPDriver = (req, res) => {    
    let item = req.params.item;
    const logStatus = req.session.logStatus;
    db.loadItem(item)
    .then((itemDoc) => {
        res.render('itempage/home', {itemDoc, logStatus});
    })
    .catch(err => console.log(err)); 
}