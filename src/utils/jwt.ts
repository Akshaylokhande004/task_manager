import jwt, { Secret, SignOptions } from "jsonwebtoken";

//  define types explicitly
const accessSecret: Secret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET!;

const accessExpiresIn: SignOptions["expiresIn"] =
  process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"];

const refreshExpiresIn: SignOptions["expiresIn"] =
  process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"];

// Access Token
export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    accessSecret,
    { expiresIn: accessExpiresIn }
  );
};

//  Refresh Token
export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    refreshSecret,
    { expiresIn: refreshExpiresIn }
  );
};

// Verify Access Token
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret) as { userId: string };
};

//  Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret) as { userId: string };
};