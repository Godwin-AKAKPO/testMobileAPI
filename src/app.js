import express from "express";
import cors from "cors";
import quoteRoutes from "./routes/quotes.routes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quotes", quoteRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
