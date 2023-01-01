
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

   
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    bookedHotel:[
        {
          hotelid: {type: String, required: true},
          time : { type : Date, default: Date.now }
        }]
      
   

})

const Users = mongoose.model('users', userSchema);

export default Users;

