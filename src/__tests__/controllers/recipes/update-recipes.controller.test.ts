import request from "supertest";
import { app } from "../../../app";
import { UpdateRecipesService } from "../../../services/recipes/update-recipes.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/recipes/update-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("UpdateRecipesController", () => {
  it("should update recipe", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Atualização realizada com sucesso",
    });

    (UpdateRecipesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .put("/recipes/1")
      .send({
        name: "Lasanha Atualizada",
        preparationMethod: "assar",
        ingredients: "massa, queijo",
        category_id: 1,
        preparationTimeMinutes: 50,
        servings: 6,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Atualização realizada com sucesso");
  });
});