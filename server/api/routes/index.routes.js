import {Router} from "express"
import { pool } from "../db.js";

const router = Router();

router.get("/ping", async (req, resp)=>{
  let [rows] = await pool.query('SELECT 1 + 1 as Result')
  console.log(rows[0])
  resp.json(rows)
})

export default router;