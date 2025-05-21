 
import cors from "cors";
import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
let Allow=["https://eduard38655.github.io","http://localhost:5173"]
router.use(cors({ 
  credentials: true, 
  origin: Allow,
  exposedHeaders: ['set-cookie'] 
}));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
 
router.use(express.static(path.join(__dirname, "public")));
 
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "",
      pass: ""
    }
  });
  
router.post("/DatosSend/Personal", async (req, res) => {
    const { FullName, Email, Message } = req.body;
  
    
  
    const mailOptions = {
      from: `"${FullName}" `,  
      to: Email,                                     
      subject: `Repository`,
      text: Message
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);  
      console.log("Email sent:", info.messageId);
      return res.json({ valid: true, messageId: info.messageId });
      
    } catch (error) {
      console.error("Nodemailer error:", error);
      return res.status(500).json({ valid: false, error: error.message });
    }
  });


export default router