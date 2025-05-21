import express from "express";
import SQL from "mssql";
import dbconfig from "./DataBase_SQL.js";

const router = express.Router();

 

router.post("/InsertData",(req,res)=>{
const {Details,Item_Status}=req.body

 SQL.connect(dbconfig).then(pool=>{
    return pool .request()
    .input("Details",SQL.NVarChar,Details)
    .input("Item_Status",SQL.NVarChar,Item_Status)
    .query("INSERT INTO TODO(Details,Status) VALUES (@Details,@Item_Status)")
 })
 .then(result=>{
    try {
      if (result.rowsAffected[0]>0) {
          res.json({data:result.rowsAffected})
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

router.put("/UpdateStatus", (req, res) => {
  const { TodoID, Status } = req.body;
  console.log(Status, TodoID);

  SQL.connect(dbconfig)
    .then(pool => {
      return pool
        .request()
        .input("TodoID", SQL.Int, TodoID)
        .input("Status", SQL.NVarChar, Status)
        .query("UPDATE TODO SET Status = @Status WHERE TodoID = @TodoID");
    })
    .then(result => {
      res.json({ message: "Status updated successfully" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});


export default router