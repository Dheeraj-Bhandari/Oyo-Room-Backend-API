import Users from "../database/model/users.js";
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";
import crypto from "crypto"

const IV = "5183666c72eec9e4";
const ENC= 'bf3c199c2470cb477d907b1e0917c17b';
const ALGO = "aes-256-cbc"
const secretKey = process.env.SECRET_KEY


const encrypt = ((text) => 
{
   let cipher = crypto.createCipheriv(ALGO, ENC, IV);
   let encrypted = cipher.update(text, 'utf8', 'base64');
   encrypted += cipher.final('base64');
   return encrypted;
});
const decrypt = ((text) => 
{
   let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
   let decrypted = decipher.update(text, 'base64', 'utf8');
   return decrypted+=decipher.final('utf8');
});



export const userSignup =async (req , res)=>{  

    const encrypted_key = encrypt(req.body.password);
    
    

    try {
        const newUser = await Users.create({
            name : req.body.name,
            email : req.body.email,
            password : encrypted_key,
        })
        await newUser.save()

        jwt.sign({newUser}, secretKey, {expiresIn:'600s'}, (err, token)=>{
            if(err)res.status(500).json(err);
            res.status(201).json({
                newUser,
                token
            })
        })
    } catch (error) {
        res.status(500).json(error);
    } 
}

export const userLogin =async (req, res)=>{
    
    Users.findOne({
        email:req.body.email,
        
    }).then((data)=>{
       
        const decrypted = decrypt(data.password);
        if(decrypted===req.body.password){
            jwt.sign({data}, secretKey, {expiresIn:'600s'}, (err, token)=>{
                if(err)res.status(500).json(err);
                res.status(200).json({
                    data,
                    token
                })
            })
        }
        else{
            res.status(500).json("Wrong Email of Password")
        }
    }).catch((err)=>{
        res.status(500).json(err);
    })   

}

export const verfiyToken = (req,res, next)=>{
    const headerToken = req.headers['authorization'];
    if(typeof headerToken !=='undefined'){
        jwt.verify(headerToken, secretKey, (err, authData)=>{
            if(err){
                res.json({result: err})
            }
            else{
                next()
            }
        } )
    }
    else{
        res.status(500).json({result: "Token not provided"})
    }
}

export const getuserdata =async (req, res)=>{
    const headerToken = req.headers['authorization'];
    const userInfo = jwt.decode(headerToken)
    res.status(200).json(userInfo);
}


export const addUserHotel =async (req, res)=>{
    const headerToken = req.headers['authorization'];
    const hotelToSave = {
        hotelid : req.body.id,
        timestamp : new Date(),
      
    }
    const userInfo = jwt.decode(headerToken)
   console.log(userInfo.data.email)
   console.log(hotelToSave)
    Users.findOneAndUpdate(userInfo.data.email, {$push: {"bookedHotel": hotelToSave}})
       .then((res)=>{
        res.status(201).json({result : "hotel Added Succesfully"})
       }).catch((err)=>{
        res.status(500).json(err)
       })
    

}

