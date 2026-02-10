import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  static create(req: Request, res: Response) {
    try {
      const category = CategoryService.createCategory(req.body);

      return res.status(201).json({
        message: "Category created",
        category,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
