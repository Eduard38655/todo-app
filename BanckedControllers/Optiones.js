// routes.js
import express from "express";
import pool from "./DataBase_PG.js";

const router = express.Router();

router.post("/NewData", async (req, res) => {
  const { Status } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM TODO WHERE Status = $1",
      [Status]
    );
    res.json({ data: result.rows });
  } catch (error) {
    console.error("Error executing NewData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
