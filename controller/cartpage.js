const db = require('../model/db');

exports.deleteCartItem = (req,res) => {
    let id = req.params.id;
    let size = req.params.size;
    let user = req.session.userEmail.split('@')[0];    
    db.deleteCartItem(id, size, user);
        // .then((val) => {
        //     console.log("Successfully deleted item!");
        // })
        // .catch((err) => {
        //     console.log("Error at catch of deleteCartItem function!\n", err);
        // })

    

    res.json({
        "Message":"Success"
    });
}