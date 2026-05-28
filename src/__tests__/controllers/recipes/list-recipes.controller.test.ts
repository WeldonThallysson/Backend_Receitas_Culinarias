import request from "supertest";
import { app } from "../../../app";
import { ListRecipesService } from "../../../services/recipes/list-recipes.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/recipes/list-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("ListRecipesController", () => {
  it("should list recipes", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      items: [
        { id: 1, name: "Lasanha" },
        { id: 2, name: "Bolo" },
      ],
      total: 2,
    });

    (ListRecipesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).get("/recipes");

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
  });
});