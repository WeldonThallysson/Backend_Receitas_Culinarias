import request from "supertest";
import { app } from "../../../app";
import { FindUsersService } from "../../../services/users/find-users.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/users/find-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("FindUsersController", () => {
  it("should return user by id", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      id: 1,
      name: "João",
      login: "joao@email.com",
    });

    (FindUsersService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });
});