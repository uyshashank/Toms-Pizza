const db = require('../model/db');

exports.IPDriver = (req, res) => {
    let item = req.params.item;
    db.loadItem(item)
    .then((itemDoc) => {
        res.render('itempage/home', {itemDoc});
    })
    .catch(err => console.log(err)); 
}