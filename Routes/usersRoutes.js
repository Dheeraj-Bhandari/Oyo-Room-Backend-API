import express from "express";
import { userSignup , userLogin, verfiyToken, getuserdata, addUserHotel} from '../Controller/UsersController.js';
const userRoute = express.Router();


userRoute.post("/signup", userSignup)
userRoute.post("/login", userLogin)
userRoute.get("/getuserdata", verfiyToken, getuserdata)
userRoute.post("/adduserhotel", verfiyToken, addUserHotel)

export default userRoute;
