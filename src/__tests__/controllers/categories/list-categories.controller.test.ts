import request from "supertest";
import { app } from "../../../app";
import { ListCategoriesService } from "../../../services/categories/list-categories.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/categories/list-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("ListCategoriesController", () => {
  it("should list categories", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      items: [
        { id: 1, name: "Massas" },
        { id: 2, name: "Carnes" },
      ],
      total: 2,
    });

    (ListCategoriesService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
  });
});