import request from "supertest";
import { app } from "../../../app";
import { ListUsersService } from "../../../services/users/list-users.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/users/list-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("ListUsersController", () => {
  it("should list users", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      items: [
        { id: 1, name: "João", login: "joao@email.com" },
        { id: 2, name: "Maria", login: "maria@email.com" },
      ],
      total: 2,
    });

    (ListUsersService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
  });
});