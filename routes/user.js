const express = require("express");
const router = express.Router();
const User =    require("../models/user.js")
const passport = require("passport")
const session = require('express-session');
const flash = require('connect-flash');
// Use express-session middleware

router.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
}));
router.use(flash());
router.use(passport.initialize());
router.use(passport.session());




router.get("/signup" , (req , res)=>{
   res.render("./users/signup.ejs")
})


//SIGNUP PAGE
router.post("/signup" , async(req , res)=>{
   try{
      let{username , email , password}  = req.body;
   const newUser = new User({email , username});
   const registeredUser = await User.register(newUser , password);
   console.log(registeredUser);
   res.redirect("/listings");
   }catch(err) {
      res.redirect("/signup");
   }
})

//LOGIN PAGE 
router.get("/login" , (req , res)=>{
   res.render("./users/login.ejs")
})

router.post("/login" , passport.authenticate("local" , {
   failureRedirect: '/login', failureFlash: true,
}) , async(req , res)=>{
   req.flash("success" , "welcome back to wanderlust")
   res.redirect("/listings");
})

router.get("/logout" , (req , res)=>{
   req.logout((err)=>{
      if(err) {
         next(err);
      }
      res.redirect("/listings");
   })
})
module.exports = router;