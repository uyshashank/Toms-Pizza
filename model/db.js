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

function random() {
    let sum =0;
    for(let j=0;j<50;j++){
        sum += Math.floor(Math.random() * 100);
    }    
    return sum%8;
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

                let t1, t2;
                for (let i = 1; i <= 2; i++) {
                    t1 = random()+i;
                    doc.recommended.push(data[1].burgers[t1]);
                }
                for (let i = 1; i <= 2; i++) {
                    t2 = random()+i;
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
                // Sellecting main item
                doc.item = data[1].burgers[index - 1];

                let t1, t2;
                for (let i = 1; i <= 2; i++) {
                    t1 = random()+i;
                    doc.recommended.push(data[0].pizza[t1]);
                }
                for (let i = 1; i <= 2; i++) {
                    t2 = random()+i;
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
                let t1, t2;
                // Sellecting main item
                doc.item = data[2].beverages[index - 1];

                for (let i = 1; i <= 2; i++) {
                    t1 = random()+i;
                    doc.recommended.push(data[0].pizza[t1]);
                }
                for (let i = 1; i <= 2; i++) {
                    t2 = random()+i;
                    doc.recommended.push(data[1].burgers[t2]);
                }
                return doc;
            })
            .catch((err) => console.log("Something went wrong! \n" + err));
    }
}