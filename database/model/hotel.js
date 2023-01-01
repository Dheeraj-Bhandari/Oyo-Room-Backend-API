
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({

    id:{
        type:Number,
        required: true
    },
    hotelName:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    distance:{
        type:String
       
    },
    city:{
        type:String,
        required: true
    },
    info:{
        type:String,
        required: true
    },
    rating:{
        type:String,
        required: true
    },
    ratingCount:{
        type:String
    
    },
    ratingStatus:{
        type:String
    
    },
    price:{
        type:String,
        required:true
    
    },
    strikedPrice:{
        type:String,
        required:true
    
    },
    discount:{
        type:String,
        required:true
    
    },
    facility1:{
        type:String
    
    },
    facility2:{
        type:String
    
    },
    facility3:{
        type:String
    
    },
    facilityX:{
        type:String
    
    },
    mainImage:{
        type:String,
        required:true,
    },
    image1:{
        type:String,
        
    },
    image2:{
        type:String,
        
    },
    image3:{
        type:String,
        
    },
    image4:{
        type:String,
        
    },
    image5:{
        type:String,
        
    },
   
    
})

const Hotels = mongoose.model('hotel', hotelSchema);

export default Hotels;

