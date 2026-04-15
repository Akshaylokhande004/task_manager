import { Task, ITask } from "../../model/task.model";
import { scheduleReminder,cancelReminder } from "../../utils/taskReminder";
import { sendWebhook } from "../../utils/webhook";

// CREATE
export const createTask = async (
  userId: string,
  title: string,
  description?: string,
  dueDate?: Date,
   category?: string,
  tags?: string[]
) => {
  const task=  await Task.create({
    title,
    description,
    dueDate,
    userId,
    category,
    tags
  });
  scheduleReminder(task);
  return task;
};

// GET ALL (with pagination + filter + search)
export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  status?: string,
  search?: string,
  category?: string,
  tags?: string[]
  
) => {
  const skip = (page - 1) * limit;

  const query: any = { userId };
  // status filter
  if (status) {
    query.status = status;
  }
   // search filter  
  if (search) {
    query.title = {
      $regex: search,
      $options: "i", // case-insensitive
    };
  }
  if(category){
    query.category = category;
  }
   if (tags) {
    query.tags = {
      $in: [tags],
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
  data: any
) => {
  const task = await Task.findOne({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  //  Check BEFORE update
  const wasCompleted = task.status === "completed";

  // Apply updates
  Object.assign(task, data);

  const updatedTask = await task.save();
  //  cancel reminder if completed
  if (updatedTask.status === "completed") {
    cancelReminder(updatedTask._id.toString());
  }
  // reschedule reminder if dueDate changed and task is still pending
   if (data.dueDate) {
    scheduleReminder(updatedTask);
  }

  //  Check AFTER update
  const isNowCompleted = updatedTask.status === "completed";

  //  Trigger webhook ONLY when status changes to completed
  if (!wasCompleted && isNowCompleted) {
    await sendWebhook({
      taskId: updatedTask._id,
      title: updatedTask.title,
      userId: updatedTask.userId,
      completedAt: new Date(),
    });
  }
  scheduleReminder(updatedTask);
  return updatedTask;
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
  cancelReminder(taskId);
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

export const getAllTags = async () => {
  return await Task.distinct("tags");
};