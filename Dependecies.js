import cookieParser from 'cookie-parser';
import cors from "cors";
import "dotenv/config";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Middlewares globales
router.use(cors(corsOptions));
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "public")));


export default router