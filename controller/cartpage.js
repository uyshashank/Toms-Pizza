const db = require('../model/db');

exports.deleteCartItem = (req, res) => {
    let id = req.params.id;
    let size = req.params.size;
    let user = req.session.userEmail.split('@')[0];
    db.deleteCartItem(id, size, user);
    res.json({
        "Message": "Success"
    });
}