import request from "supertest";
import { app } from "../../../app";
import { DeleteRecipesService } from "../../../services/recipes/delete-recipes.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/recipes/delete-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("DeleteRecipesController", () => {
  it("should delete recipe", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Deletado com sucesso",
    });

    (DeleteRecipesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .delete("/recipes/1")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Deletado com sucesso");
  });
});