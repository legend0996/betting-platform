import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export class AdminController {
  static async createAdmin(req: Request, res: Response) {
    try {
      const { username, password, roleId } = req.body;

      if (!username || !password || !roleId) {
        return res.status(400).json({
          message: "username, password and roleId are required",
        });
      }

      const admin = await AdminService.createAdmin(
        username,
        password,
        Number(roleId),
      );

      return res.status(201).json({
        message: "Admin created successfully",
        admin: {
          id: admin.id,
          username: admin.username,
          roleId: admin.roleId,
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
