import { sendWebhook } from "./webhook";

const reminders = new Map<string, NodeJS.Timeout>();

  export const scheduleReminder = (task: any) => {
  if (!task.dueDate) return;

  const taskId = task._id.toString();

  const reminderTime =
    new Date(task.dueDate).getTime() - 10 * 1000;

  const delay = reminderTime - Date.now();

  if (delay <= 0) return;

  //  Clear existing reminder
  if (reminders.has(taskId)) {
    clearTimeout(reminders.get(taskId)!);
  }

  const timeout = setTimeout(async () => {
    console.log(
      ` Reminder: Task "${task.title}" is due soon`
    );

    //  OPTIONAL WEBHOOK (bonus)
    try {
      await sendWebhook({
        taskId: task._id,
        title: task.title,
        userId: task.userId,
        reminder: true,
      });
    } catch (err) {
      console.error("Reminder webhook failed");
    }

  }, delay);

  reminders.set(taskId, timeout);

};

export const cancelReminder = (taskId: string) => {
  if (reminders.has(taskId)) {
    clearTimeout(reminders.get(taskId)!);
    reminders.delete(taskId);
  } else {
    console.warn(`No reminder found for task ${taskId}`);
  };
}