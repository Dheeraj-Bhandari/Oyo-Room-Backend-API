
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({

    id:{
        type:Number,
       
    },
    hotelName:{
        type:String,
       
    },
    address:{
        type:String,
        
    },
    distance:{
        type:String
       
    },
    city:{
        type:String,
      
    },
    info:{
        type:String,
       
    },
    rating:{
        type:String,
    
       
    },
    ratingCount:{
        type:String
    
    },
    ratingStatus:{
        type:String
    
    },
    price:{
        type:String,
        
    
    },
    strikedPrice:{
        type:String,
       
    
    },
    discount:{
        type:String,
        
    
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

