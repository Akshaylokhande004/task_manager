import { Task, ITask } from "../../model.ts/task.model";

// CREATE
export const createTask = async (
  userId: string,
  title: string,
  description?: string,
  dueDate?: Date
) => {
  return await Task.create({
    title,
    description,
    dueDate,
    userId,
  });
};

// GET ALL (with pagination + filter + search)
export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const query: any = { userId };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.title = {
      $regex: search,
      $options: "i", // case-insensitive
    };
  }

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);

  return { tasks, total };
};

// GET SINGLE TASK
export const getTaskById = async (
  taskId: string,
  userId: string
) => {
  return await Task.findOne({
    _id: taskId,
    userId,
  });
};

// UPDATE
export const updateTask = async (
  taskId: string,
  userId: string,
  data: Partial<ITask>
) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    data,
    { new: true }
  );

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
};

// DELETE
export const deleteTask = async (
  taskId: string,
  userId: string
) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
};

// TOGGLE (optional - you can keep or remove)
export const toggleTask = async (
  taskId: string,
  userId: string
) => {
  const task = await Task.findOne({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  task.status =
    task.status === "pending" ? "completed" : "pending";

  await task.save();

  return task;
};