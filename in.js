const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb+srv://shashank:pass1997@tomspizza-5i4uk.mongodb.net/';
let client;

function connect() {    
    return MongoClient.connect(url, {useNewUrlParser: true});
};

connect()
.then((localclient)=>{
    client = localclient;
    let db = client.db('products');        
    db.collection('foodItems').findOneAndUpdate({"burgers":{$all:[{"pr_info":"Crispy burger"}]}})
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>console.log(err));
})
.catch(err => console.log(err));
    
