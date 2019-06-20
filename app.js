const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const {check} = require("express-validator");

const store = new MongoDBStore({
    uri: 'mongodb+srv://shashank:mypass1997@tomspizza-5i4uk.mongodb.net/sessions',
    collection: 'sessions'
});

// Custom modules
const HP = require('./controller/homepage');
const IP = require('./controller/itempage');
const CP = require('./controller/cartpage');
const isAuth = require('./middleware/isLoggedin');

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
});

app.use(session({
    secret: 'Jai Hind',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(cookieParser());


// Get Routes
app.get('/', HP.HPDriver);
app.get('/find/:item', IP.IPDriver);
app.get('/login', HP.getLogin);
app.get('/logout', HP.logout);
app.get('/signup', HP.getSignup);
app.get('/logStatus', HP.whatIsLogStatus);
app.get('/cart',isAuth.isLoggedIn, HP.loadCart);
app.get('/pizza', HP.loadPizza);
app.get('/burgers', HP.loadBurgers);
app.get('/beverages', HP.loadBeverages);
app.get('/checkout',isAuth.isLoggedIn, HP.loadCheckoutpage);
app.get('/orderPlaced',isAuth.isLoggedIn, HP.loadFinalPage);


// Delete Routes
app.delete('/delete/:id/:size', CP.deleteCartItem);
app.delete('/delete/:id', CP.deleteCartItem);


// Post Routes
app.post('/login', HP.postLogin);
app.post('/signup',check('email').isEmail(), HP.postSignup);
app.post('/atc', HP.ATC_Handler);
app.post('/emptyCart',CP.emptyCart);
// Starting server
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`)
});