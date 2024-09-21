const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const { log } = require("console");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const {listingSchema , reviewSchema} = require("./schema.js");
const session = require('express-session');
const Review = require("./models/review.js");
const listings = require("./routes/listing.js")
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user.js");
const flash = require('connect-flash');
const userRouter = require("./routes/user.js")

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(passport.initialize());
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
main()
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions = {
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
};
// app.get("/", (req, res) => {
//   res.render("./listings/home.ejs")
// });
// app.get("/" , (req , res)=>{
//   res.render("/listings/home.ejs")
// })
//Index Route
// app.get("/listings", async (req , res) => {
//   let allListings = await Listing.find({});
//   res.render("./listings/index.ejs", { allListings });
// });
// // Create Route
// app.get("/listings/new", (req, res) => {
//   res.render("listings/new.ejs");
// });

// app.post("/listings", async (req, res , next) => {
//   // try{
//    const result =  listingSchema.validate(req.body);
//    console.log(result);
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
//   // }catch(err) {
//   //   next(err);
//   // }
// });

app.use("/listings" , listings)
app.use("/" , userRouter);

// //Edit Route

// app.get("/listings/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs", { listing });
// });
// //Show Route
// app.get("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show.ejs", { listing });
// });
// //Update Route
// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, req.body.listing);
//   res.redirect(`/listings/${id}`);
// });
// //Delete Route
// app.delete("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// });

// //Post route
// app.post("/listings/:id/reviews" , async(req , res)=> {
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);
//   listing.reviews.push(newReview);
//   await newReview.save();

//   console.log("new review saved");
//   res.redirect(`/listings/${listing._id}`)
// })



//                  get cookies from server

// app.get("/getcookies" , (req , res)=>{
//   res.cookie("greet" , "namaste");
//   res.send("sent you some cookie")
// })
// app.get("/cookie" , (req , res)=>{
//   console.dir(req.cookies);
//   res.send("cookie parser")
// })

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser(User.deserializeUser()));
app.use((err , req , res , next) => {
  // res.send("Something went wrong")
  console.log(err);
  res.render("./listings/error.ejs");
})
// app.use((req,res,nexr)=>{
//   res.locals.currUser = req.user;
//   next();
// });
    //******************************** register a user

// app.get("/demouseerr" , async(req , res)=>{
//   let fakeUser = new User({
//     email : "stttudent@gmail.com",
//     username : "deeelta-student"
//   });
//   let registeredUser = await User.register(fakeUser , "helloworld");
//   res.send(registeredUser);
// })


app.listen(8080, (req, res) => {
  console.log("server is listening to the port 8080");
});
