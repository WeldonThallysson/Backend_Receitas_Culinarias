import request from "supertest";
import { app } from "../../../app";
import { DeleteCategoriesService } from "../../../services/categories/delete-categories.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/categories/delete-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("DeleteCategoriesController", () => {
  it("should delete category", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Deletado com sucesso",
    });

    (DeleteCategoriesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .delete("/categories/1")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Deletado com sucesso");
  });
});