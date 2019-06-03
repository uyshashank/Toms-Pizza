const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 3000;
const store = new MongoDBStore({
    uri: 'mongodb+srv://shashank:pass1997@tomspizza-5i4uk.mongodb.net/sessions',
    collection:'sessions'
});

// Custom modules
const HP = require('./controller/homepage');
const IP = require('./controller/itempage');

// Middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'Jai Hind',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.set('view engine', 'ejs');

// Get Routes
app.get('/', HP.HPDriver);
app.get('/find/:item', IP.IPDriver);
app.get('/login',HP.getLogin);
app.get('/logout',HP.logout);
app.get('/signup',HP.getSignup);

// Post Routes
app.post('/login',HP.postLogin);
app.post('/signup',HP.postSignup);

// Starting server
app.listen(PORT, () => console.log(`Server is up at ${PORT}`));