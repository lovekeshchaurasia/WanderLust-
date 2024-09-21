const express = require("express");
const router = express.Router();
const {listingSchema , reviewSchema} = require("../schema")
const Listing = require("../models/listing.js");
const passport = require("passport");
router.use(passport.initialize());
router.use(passport.session());
const {isLoggedIn} = require("../middleware.js")
// router.get("/nice" , (req , res)=>{
//     console.dir(req.cookie);
//     res.send("send you some cookie!");
// })
router.get("/", async (req , res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  });
  // Create Route
  router.get("/new", isLoggedIn , (req, res , next) => {
    console.log(req.user);
  //   if(!req.isAuthenticated()) {
  //     req.flash('error', 'This is a success flash message!');
  //     return res.redirect("/login")
  //   }
  //   next();
  // } ,(req , res) => {
    res.render("listings/new.ejs");
  });
  
  router.post("/", async (req, res , next) => {
    // try{
     const result =  listingSchema.validate(req.body);
     console.log(result);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // }catch(err) {
    //   next(err);
    // }
  });
  //Edit Route
  router.get("/:id/edit", isLoggedIn ,async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  });
  //Show Route
  router.get("/:id",isLoggedIn , async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  });
  //Update Route
  router.put("/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
  });
  //Delete Route
  router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });
  
  //Post route
  router.post("/:id/reviews" , async(req , res)=> {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
  
    console.log("new review saved");
    res.redirect(`/${listing._id}`)
  })

  module.exports = router;