// DataBase_PG.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user:process.env.user,
  host:process.env.host,
  database:process.database,
  password:process.env.password,
  port:5432,
  ssl:true,
});

export default pool;
