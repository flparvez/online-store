import jwt from 'jsonwebtoken';

const SECRET = process.env.TOKEN_SECRET; // Ensure you have a secret in your env

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET!);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
