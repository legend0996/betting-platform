import bcrypt from "bcrypt";
import prisma from "../../config/database";
import { logger } from "../../utils/logger";

export class AdminService {
  static async createAdmin(username: string, password: string, roleId: number) {
    const existing = await prisma.admin.findUnique({
      where: { username },
    });

    if (existing) {
      throw new Error("Admin already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        passwordHash,
        roleId,
        status: "active",
      },
    });

    logger.info("Admin created", { adminId: admin.id });

    return admin;
  }

  static async getAllAdmins() {
    return prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        status: true,
        createdAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  static async findByUsername(username: string) {
    return prisma.admin.findUnique({
      where: { username },
    });
  }

  static async disableAdmin(adminId: number) {
    return prisma.admin.update({
      where: { id: adminId },
      data: { status: "disabled" },
    });
  }
}
