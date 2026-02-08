import { Request, Response, NextFunction } from "express";

/**
 * Allow only admins
 */
export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const auth = (req as any).auth;

  if (!auth || auth.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
}

/**
 * Permission-based guard
 */
export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as any).auth;

    if (!auth || !auth.permissions?.includes(permission)) {
      return res.status(403).json({
        message: "Insufficient permissions",
      });
    }

    next();
  };
}
