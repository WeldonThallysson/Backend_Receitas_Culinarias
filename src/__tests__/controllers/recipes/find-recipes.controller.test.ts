import request from "supertest";
import { app } from "../../../app";
import { FindRecipesService } from "../../../services/recipes/find-recipes.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/recipes/find-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("FindRecipesController", () => {
  it("should return recipe by id", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      id: 1,
      name: "Lasanha",
    });

    (FindRecipesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).get("/recipes/1");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Lasanha");
  });
});