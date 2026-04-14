import prisma from "../../config/db";
import { hashPassword, comparePassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

export const registerUser = async (email: string, password: string) => {
  
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

    return { accessToken, refreshToken };
  };
  
    //REFRESH TOKEN
  
    export const refreshAccessToken = async (refreshToken: string) => {
    try
    {
      const decoded = verifyRefreshToken(refreshToken);
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error("Invalid refresh token");
      }
      const newAccessToken = generateAccessToken(decoded.userId);
      const newRefreshToken = generateRefreshToken(decoded.userId);
      //rotate Token
      await prisma.refreshToken.delete({
        where: { token: refreshToken },
      });
      await prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: decoded.userId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }catch (error) {
      throw new Error("Invalid refresh token");
    }
  };

  //logOut
  export const logOutUser = async (refreshToken: string) => {
    await prisma.refreshToken.delete({
      where: { token  : refreshToken },
    });
  };

    // "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMDk1Mzk0MC00NTY5LTQ5MGUtOTljNC01M2ZhZTRhNDE3NTMiLCJpYXQiOjE3NzUyMDM1MDMsImV4cCI6MTc3NTIwNDQwM30.a7IIVb9Ga-BSRaT669G4heF2AhAikJOoKjH1k_MCckM",
    // "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMDk1Mzk0MC00NTY5LTQ5MGUtOTljNC01M2ZhZTRhNDE3NTMiLCJpYXQiOjE3NzUyMDM1MDMsImV4cCI6MTc3NTgwODMwM30.nCSdd0V9EEUu4ExEPZf4alpDqOKSgRR7HA0FHM9gYLQ"