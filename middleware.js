module.exports.isLoggedIn = (req , res , next) => {
    if(!req.isAuthenticated()) {
        // req.flash('error', 'This is a success flash message!');
        return res.redirect("/login")
      }
      next();
    }
