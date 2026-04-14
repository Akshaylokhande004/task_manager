import { Request, Response } from "express";
import { registerUser, loginUser, logOutUser,refreshAccessToken} from "./auth.service";

export const register = async (req: Request, res: Response) => {
  console.log("Register called with body:");
  try {
    const { email, password } = req.body;
   
    const user = await registerUser(email, password);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const tokens = await loginUser(email, password);

    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
export const logout = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;

    await logOutUser(refreshToken);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "Logout failed" });
  }
};



export const refresh = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const tokens = await refreshAccessToken(refreshToken);

    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

