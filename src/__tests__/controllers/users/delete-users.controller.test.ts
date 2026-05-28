import request from "supertest";
import { app } from "../../../app";
import { DeleteUsersService } from "../../../services/users/delete-users.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../services/users/delete-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
  requireAuth: (req: Request, _: Response, next: NextFunction) => {
    req.user_id = 1;
    return next();
  },
}));

describe("DeleteUsersController", () => {
  it("should delete user successfully", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Deletado com sucesso",
    });

    (DeleteUsersService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .delete("/users/1")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Deletado com sucesso");
  });
});