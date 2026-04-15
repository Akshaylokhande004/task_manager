import { request,response } from "express";
import { CATEGORIES } from "../../../model/categories";

export const getCategories = async (req: typeof request, res: typeof response) => {
    try {
        return res.json(CATEGORIES);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    };
};