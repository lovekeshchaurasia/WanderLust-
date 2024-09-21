const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
       type : String ,
       required : true
    },
    description : String ,  
    
    image : {
        type : Object,
        default:
            "https://images.unsplash.com/photo-1698345071031-49361d6cdb36?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Mnx8fGVufDB8fHx8fA%3D%3D",
        set : (v)=> v===""?"https://images.unsplash.com/photo-1698345071031-49361d6cdb36?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Mnx8fGVufDB8fHx8fA%3D%3D" : v,  
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
         ref: "Review",
        },
    ],
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
