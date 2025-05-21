import cors from "cors";
import "dotenv/config";
import express from 'express';
import ClearItems from "./BanckedControllers/ClearItems.js";
import Dependecies from "./BanckedControllers/Dependecies.js";
import GetData from "./BanckedControllers/GetData.js";
import InsertarData from "./BanckedControllers/InsertData.js";
import NewData from "./BanckedControllers/Optiones.js";

const app = express();

app.use("/",Dependecies)
app.use("/",InsertarData)
app.use("/",GetData)
app.use("/",NewData)
app.use("/",ClearItems)
app.use(
  cors({
    origin: function (origin, callback) {
      const allowList = [
        'http://localhost:5173',
        'https://eduard38655.github.io',
        'http://10.0.0.86:5173',
        'https://todo-app-ejux.onrender.com'
      ];
      if (!origin || allowList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true
  })
);

let PORT= process.env.port
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 