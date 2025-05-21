import express from "express";
import SQL from "mssql";
import dbconfig from "./DataBase_SQL.js";

const router = express.Router();

 

router.get("/GetData",(req,res)=>{
 
 SQL.connect(dbconfig).then(pool=>{
    return pool .request()
 
    .query("SELECT * FROM TODO")
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