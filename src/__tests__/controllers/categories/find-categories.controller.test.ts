import request from "supertest";
import { app } from "../../../app";
import { FindCategoriesService } from "../../../services/categories/find-categories.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/categories/find-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("FindCategoriesController", () => {
  it("should return category by id", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      id: 1,
      name: "Massas",
    });

    (FindCategoriesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).get("/categories/1");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Massas");
  });
});