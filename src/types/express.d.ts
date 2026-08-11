export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}