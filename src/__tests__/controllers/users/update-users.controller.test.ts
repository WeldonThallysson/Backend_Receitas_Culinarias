import request from "supertest";
import { app } from "../../../app";
import { UpdateUsersService } from "../../../services/users/update-users.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/users/update-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("UpdateUsersController", () => {
  it("should update user", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Atualização realizada com sucesso",
    });

    (UpdateUsersService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .put("/users/1")
      .send({
        name: "João atualizado",
        login: "joao@email.com",
        password: "123456",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Atualização realizada com sucesso");
  });
});