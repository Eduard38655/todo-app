// routes.js
import express from "express";
import pool from "./DataBase_PG.js";

const router = express.Router();

router.get("/GetData", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM TODO");
    res.json({ data: result.rows });
  } catch (error) {
    console.error("Error executing GetData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
