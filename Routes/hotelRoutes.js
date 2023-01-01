import express from "express";
import {addHotel,getHotel,getHotelById,getHotelByQuery} from '../Controller/HotelController.js'
const hotelRoute = express.Router();


hotelRoute.get("/" , (req, res)=>{
    res.send({
        filterType : ["facility", "city", "address","hotelName", "rating", "page"]
    })
})
hotelRoute.post("/addhotel" ,addHotel)
hotelRoute.get("/gethotels" ,getHotel)
hotelRoute.get("/gethotels/:id" ,getHotelById)

// route.get("/gethotels/:query" ,getHotelByQuery)


export default hotelRoute;
