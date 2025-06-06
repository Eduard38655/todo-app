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

app.use(cors({ origin: [
  'http://localhost:5173',
  'https://eduard38655.github.io',
  'http://10.0.0.86:5173'
]}));
 // Lista de orígenes permitidos
const allowList = [
  'http://localhost:5173',
  'https://eduard38655.github.io',
  'http://10.0.0.86:5173'
];
 
// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['set-cookie'],
};


 app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
 