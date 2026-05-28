import request from "supertest";
import { app } from "../../../app";
import { UpdateCategoriesService } from "../../../services/categories/update-categories.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/categories/update-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("UpdateCategoriesController", () => {
  it("should update category", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Atualização realizada com sucesso",
    });

    (UpdateCategoriesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .put("/categories/1")
      .send({ name: "Massas atualizada" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Atualização realizada com sucesso");
  });
});