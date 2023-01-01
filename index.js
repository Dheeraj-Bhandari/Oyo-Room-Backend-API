import express from "express";
import connection from "./database/db.js";
import cors from "cors";
import hotelRoute from "./Routes/hotelRoutes.js";
import userRoute from "./Routes/usersRoutes.js";
connection();
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", hotelRoute);
app.use("/", userRoute);




const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`backend Server listing at http://localhost:${PORT}`);
});

