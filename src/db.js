import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "godwin",
  password: "wino@17\\", // ← DOUBLE \ OBLIGATOIRE
  database: "quotehub_db",
});
