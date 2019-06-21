Example: checking if e-mail is in use
const { body } = require('express-validator');

app.post('/user', body('email').custom(value => {
  return User.findUserByEmail(value).then(user => {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  });
}), (req, res) => {
  // Handle the request
});