// routes.js o como lo hayas nombrado
import express from "express";
import pool from "./DataBase_PG.js";

const router = express.Router();

router.delete("/Clear", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM TODO WHERE Status = 'Open'");
    res.json({ data: result.rowCount });
  } catch (error) {
    console.error("Error executing Clear:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/ClearDatos", async (req, res) => {
  const { ItemsID } = req.body;

  try {
    const result = await pool.query(
      "DELETE FROM TODO WHERE TodoID = $1",
      [ItemsID]
    );
    res.json({ data: result.rowCount });
  } catch (error) {
    console.error("Error executing ClearDatos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
