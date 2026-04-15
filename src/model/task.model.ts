import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  status: "pending" | "completed";
  userId: string;
  category?: "Work" | "Personal" | "Urgent";
  tags?: string[];
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    category:{
        type: String,
        enum: ["Work", "Personal", "Urgent"],
        default: "other"
    },
    tags: [
  {
    type: String,
  },
],
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);