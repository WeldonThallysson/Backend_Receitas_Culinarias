import request from "supertest";
import { app } from "../../../app";
import { CreateRecipesService } from "../../../services/recipes/create-recipes.service";
import { NextFunction, Request } from "express";

jest.mock("../../../services/recipes/create-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("CreateRecipesController", () => {
  it("should create recipe successfully", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Cadastro realizado com sucesso",
    });

    (CreateRecipesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .post("/recipes")
      .send({
        name: "Lasanha",
        preparation_method: "assar",
        ingredients: "massa, queijo",
        category_id: 1,
        preparation_time_minutes: 40,
        servings: 4,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Cadastro realizado com sucesso");
  });
});