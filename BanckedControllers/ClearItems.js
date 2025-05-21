import express from "express";
import SQL from "mssql";
import dbconfig from "./DataBase_SQL.js";

const router = express.Router();

 

  router.delete("/Clear",(req,res)=>{
 
  
 SQL.connect(dbconfig).then(pool=>{
     return pool.request()
 
    .query("DELETE TODO WHERE Status='Open' ")
 })
 .then(result=>{
    try {
      if (result.rowsAffected.length>0) {
          res.json({data:result.rowsAffected})
      } else {
        console.error("There was an error: ");
        
      }
    } catch (error) {
     console.error(error);
        
    }
 })
 .catch(error=>console.error(error)
 )

}) 



  router.delete("/ClearDatos",(req,res)=>{
 const {ItemsID}=req.body
  
 SQL.connect(dbconfig).then(pool=>{
     return pool.request()
 .input("ItemsID",SQL.Int,ItemsID)
  .query("DELETE TODO WHERE TodoID=@ItemsID")
 })
 .then(result=>{
    try {
      if (result.rowsAffected.length>0) {
          res.json({data:result.rowsAffected})
      } else {
        console.error("There was an error: ");
        
      }
    } catch (error) {
     console.error(error);
        
    }
 })
 .catch(error=>console.error(error)
 )

}) 

export default router