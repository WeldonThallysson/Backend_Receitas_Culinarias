import request from "supertest";
import { app } from "../../../app";
import { CreateCategoriesService } from "../../../services/categories/create-categories.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/categories/create-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("CreateCategoriesController", () => {
  it("should create category successfully", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Cadastro realizado com sucesso",
    });

    (CreateCategoriesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .post("/categories")
      .send({ name: "Massas" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Cadastro realizado com sucesso");
  });
});