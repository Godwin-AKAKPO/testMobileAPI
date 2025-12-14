import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // doit être la Neon URL
  ssl: { rejectUnauthorized: false }          // obligatoire pour Neon
});

export { pool };
