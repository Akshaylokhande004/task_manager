import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  getTags,
} from "./task.controller";

const router = Router();
router.use(authMiddleware);
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 example: 2026-04-20T10:00:00.000Z
 *               category:
 *                 type: string
 *                 example: Work
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Backend", "Urgent"]
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks with filtering
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get("/", getAll);
/**
 * @swagger
 * /tasks/tags:
 *   get:
 *     summary: Get all unique tags
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tags
 */
router.get("/tags", getTags);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get single task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 */
router.get("/:id", getById);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: completed
 *               dueDate:
 *                 type: string
 *                 example: 2026-04-20T10:00:00.000Z
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.patch("/:id", update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", remove);




export default router;