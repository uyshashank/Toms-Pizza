exports.isLoggedIn = (req, res, next) => {
    if (req.session.logStatus == 'true')
        next();
    else {
        res.redirect('/login');
    }
}