const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
 
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
app.set('view engine', 'ejs');

// Get Routes
app.get('/', HP.HPDriver);
app.get('/find/:item', IP.IPDriver);
// Post Routes

// Starting server
app.listen(PORT, () => console.log(`Server is up at ${PORT}`));