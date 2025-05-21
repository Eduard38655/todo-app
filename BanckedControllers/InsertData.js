import express from "express";
import pool from "./DataBase_SQL.js";

const router = express.Router();

// Ruta: Insertar un nuevo TODO
router.post("/InsertData", async (req, res) => {
  const { Details, Item_Status } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO TODO (Details, Status) VALUES ($1, $2) RETURNING *",
      [Details, Item_Status]
    );
    res.json({ message: "Item inserted successfully", data: result.rows });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta: Actualizar el estado de un TODO
router.put("/UpdateStatus", async (req, res) => {
  const { TodoID, Status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE TODO SET Status = $1 WHERE TodoID = $2 RETURNING *",
      [Status, TodoID]
    );

    if (result.rowCount > 0) {
      res.json({ message: "Status updated successfully", data: result.rows });
    } else {
      res.status(404).json({ message: "Todo item not found" });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
