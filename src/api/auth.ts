import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function signJwt(payload: object, opts?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...opts });
}

export function verifyJwt<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
}
