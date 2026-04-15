import { Router } from "express";   
import { getCategories } from "./category.controller";
import { authMiddleware } from '../../../middleware/auth.middleware';
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category APIs
 */
router.get("/", authMiddleware, getCategories);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getCategories);

export default router;  