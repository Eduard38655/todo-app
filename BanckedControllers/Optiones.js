import express from "express";
import SQL from "mssql";
import dbconfig from "./DataBase_SQL.js";

const router = express.Router();

 

router.post("/NewData",(req,res)=>{
const {Status}=req.body

 SQL.connect(dbconfig).then(pool=>{
    return pool .request()

    .input("Status",SQL.NVarChar,Status)
    .query("SELECT * FROM TODO WHERE Status=@Status")
 })
 .then(result=>{
    try {
      if (result.recordset) {
          res.json({data:result.recordset})
      } else {
        console.error("There was an error: ",error);
        
      }
    } catch (error) {
     console.error(error);
        
    }
 })
 .catch(error=>console.error(error)
 )

}) 


export default router