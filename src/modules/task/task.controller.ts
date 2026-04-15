import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTags,
} from "./task.service";

// CREATE
export const create = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, dueDate, category, tags } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await createTask(
      user.userId,
      title,
      description,
      dueDate,
      category,
      tags
  
    );

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAll = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const status =
      typeof req.query.status === "string"
        ? req.query.status
        : undefined;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;
    const category =
       typeof req.query.category === "string"
         ? req.query.category
         : undefined;

const tag =
  typeof req.query.tag === "string"
    ? req.query.tag
    : undefined;

    const { tasks, total } = await getTasks(
      user.userId,
      page,
      limit,
      status,
      search
    );

    return res.json({
      data: tasks,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TASK (NEW - REQUIRED)
export const getById = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const id =
       typeof req.params.id === "string"
       ? req.params.id
       : req.params.id?.[0];
    if (!id) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await getTaskById(id, user.userId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const update = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
   const id =
       typeof req.params.id === "string"
       ? req.params.id
       : req.params.id?.[0];
    if (!id) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await updateTask(id, user.userId, req.body);

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const remove = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const id =
       typeof req.params.id === "string"
       ? req.params.id
       : req.params.id?.[0];

    if (!id) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    await deleteTask(id, user.userId);

    return res.json({ message: "Task deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTags = async (req: Request, res: Response) => {
  try{
    const tags = await getAllTags();
    return res.json(tags);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};