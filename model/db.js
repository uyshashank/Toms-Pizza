const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb+srv://shashank:admin@tomspizza-5i4uk.mongodb.net/';
let client;

function connect() {    
    return MongoClient.connect(url, {useNewUrlParser: true});
};

function loadData(localclient) {
    client = localclient;
    let db = client.db('products');    
    return db.collection('pizza').find().toArray();
}


function closeDB(){
   client.close()
   .catch((err) => console.log("Err -> " + err))
}

module.exports = {
    loadData,
    closeDB,
    connect
}