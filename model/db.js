const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb+srv://shashank:pass1997@tomspizza-5i4uk.mongodb.net/';
let client;

function connect() {    
    return MongoClient.connect(url, {useNewUrlParser: true});
};

function loadData(localclient) {
    client = localclient;
    let db = client.db('products');        
    return db.collection('foodItems').find().toArray();
}
module.exports = {
    loadData,
    connect
}