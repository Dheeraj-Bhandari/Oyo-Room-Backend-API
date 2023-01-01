
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
         data : {type:String}
        }]
      
   

})

const Users = mongoose.model('users', userSchema);

export default Users;

