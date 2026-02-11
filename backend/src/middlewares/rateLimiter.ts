import { Request, Response, NextFunction } from "express";

const requests = new Map<string, { count: number; time: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();

  const record = ip ? requests.get(ip) : undefined;

  if (!record) {
    if (ip) requests.set(ip, { count: 1, time: now });
    return next();
  }

  if (now - record.time > WINDOW_MS) {
    if (ip) requests.set(ip, { count: 1, time: now });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests. Try again later.",
    });
  }

  record.count++;
  if (ip) requests.set(ip, record);
  next();
}
