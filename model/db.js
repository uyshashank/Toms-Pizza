const {
    MongoClient
} = require('mongodb');
const url = 'mongodb+srv://shashank:pass1997@tomspizza-5i4uk.mongodb.net/';
let client;

exports.connect = () => {
    return MongoClient.connect(url, {
        useNewUrlParser: true
    });
};

exports.loadData = (localclient) => {
    client = localclient;
    let db = client.db('products');
    return db.collection('foodItems').find().toArray();
}

function random(i) {
    if (i == 1) {
        return Math.floor(Math.random(i) * 100) % 9;
    } else if (i == 2) {
        return Math.floor((Math.random(Math.random()) + 2321) * 100) % 9;
    }
}
// Loading items for itempage
exports.loadItem = (item) => {
    let db = client.db('products');
    let category = item.split('0')[0];

    if (category == 'pza') {
        let index = parseInt(item.split('pza00')[1]);
        return db.collection('foodItems').find().toArray()
            .then((data) => {
                let doc = {
                    pr_cat: "pizza",
                    pr_category: ["burgers", "beverages"],
                    recommended: []
                };
                // Sellecting main item
                doc.item = data[0].pizza[index - 1];

                let temp1, temp2;
                for (let i = 1; i <= 2; i++) {
                    let t1 = random(i);
                    // Preventing same number algo
                    if (i == 1)
                        temp1 = t1;
                    else if (i == 2)
                        temp2 = t1;

                    if (temp1 == temp2) {
                        if (temp2 != 0)
                            t1 -= 1;
                        else
                            t1 += 1;
                    }
                    doc.recommended.push(data[1].burgers[t1]);
                }
                for (let i = 1; i <= 2; i++) {
                    let t2 = random(i);
                    if (i == 1)
                        temp1 = t2;
                    else if (i == 2)
                        temp2 = t2;

                    if (temp1 == temp2) {
                        if (temp2 != 0)
                            t2 -= 1;
                        else
                            t2 += 1;
                    }
                    doc.recommended.push(data[2].beverages[t2]);
                }
                return doc;
            })
            .catch((err) => console.log("Something went wrong! \n" + err));
    } else if (category == 'bgr') {
        let index = parseInt(item.split('bgr00')[1]);
        return db.collection('foodItems').find().toArray()
            .then((data) => {
                let doc = {
                    pr_cat: "burgers",
                    pr_category: ["pizza", "beverages"],
                    recommended: []
                };
                let temp1, temp2;
                // Sellecting main item
                doc.item = data[1].burgers[index - 1];
                for (let i = 1; i <= 2; i++) {
                    let t1 = random(i);
                    // Preventing same number algo
                    if (i == 1)
                        temp1 = t1;
                    else if (i == 2)
                        temp2 = t1;

                    if (temp1 == temp2) {
                        if (temp2 != 0)
                            t1 -= 1;
                        else
                            t1 += 1;
                    }
                    doc.recommended.push(data[0].pizza[t1]);
                }
                for (let i = 1; i <= 2; i++) {
                    let t2 = random(i);
                    // Preventing same number algo
                    if (i == 1)
                        temp1 = t2;
                    else if (i == 2)
                        temp2 = t2;

                    if (temp1 == temp2) {
                        if (temp2 != 0)
                            t2 -= 1;
                        else
                            t2 += 1;
                    }
                    doc.recommended.push(data[2].beverages[t2]);
                }
                return doc;
            })
            .catch((err) => console.log("Something went wrong! \n" + err));
    } else if (category == 'bvg') {
        let index = parseInt(item.split('bvg00')[1]);
        return db.collection('foodItems').find().toArray()
            .then((data) => {
                let doc = {
                    pr_cat: "beverages",
                    pr_category: ["pizza", "burgers"],
                    recommended: []
                };
                let temp1, temp2;
                // Sellecting main item
                doc.item = data[2].beverages[index - 1];

                for (let i = 1; i <= 2; i++) {
                    let t1 = random(i);
                    if (i == 1)
                        temp1 = t1;
                    else if (i == 2)
                        temp2 = t1;

                    if (temp1 == temp2) {
                        if (temp2 != 0)
                            t1 -= 1;
                        else
                            t1 += 1;
                    }
                    doc.recommended.push(data[0].pizza[t1]);
                }
                for (let i = 1; i <= 2; i++) {
                    let t2 = random(i);
                    if (i == 1)
                        temp1 = t2;
                    else if (i == 2)
                        temp2 = t2;

                    if (temp1 == temp2) {
                        if (temp2 != 0)
                            t2 -= 1;
                        else
                            t2 += 1;
                    }
                    doc.recommended.push(data[1].burgers[t2]);
                }
                return doc;
            })
            .catch((err) => console.log("Something went wrong! \n" + err));
    }
}

exports.authenticateUser = (userInfo) => {
    let db = client.db('accounts');
    return db.collection('users').find({
        "user_email": userInfo.email
    }).toArray();
}
// Checking whether user with this email exist or not
exports.checkUserExistence = (userInfo) => {
    let db = client.db('accounts');
    return db.collection('users').find({
        "user_email": userInfo.user_email
    }).toArray();
}
// Inserting new user
exports.insertUser = (userInfo) => {
    let db = client.db('accounts');
    return db.collection('users').insertOne(userInfo);
}
