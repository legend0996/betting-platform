import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export class AdminController {
  static async createAdmin(req: Request, res: Response) {
    try {
      const { username, password, role_id } = req.body;

      if (!username || !password || !role_id) {
        return res.status(400).json({
          message: "username, password and role_id are required",
        });
      }

      const admin = await AdminService.createAdmin(
        username,
        password,
        Number(role_id),
      );

      return res.status(201).json({
        message: "Admin created successfully",
        admin: {
          id: admin.id,
          username: admin.username,
          role_id: admin.role_id,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async listAdmins(req: Request, res: Response) {
    const admins = await AdminService.getAllAdmins();

    return res.json(admins);
  }

  static async disableAdmin(req: Request, res: Response) {
    const adminId = Number(req.params.id);

    await AdminService.disableAdmin(adminId);

    return res.json({ message: "Admin disabled successfully" });
  }
}
