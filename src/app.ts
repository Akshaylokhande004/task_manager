import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";
import { connectMongo } from "./config/mongo";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";





connectMongo();
const app =express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categories", require("./modules/task/category/category.route").default);


/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test API
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/",(req,res)=>
    {
        res.send("Hello World");
    })
export default app;
