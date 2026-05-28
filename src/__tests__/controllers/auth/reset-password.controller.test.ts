import request from "supertest";
import { app } from "../../../app";
import { ResetPasswordService } from "../../../services/auth/reset-password.service";

jest.mock("../../../services/auth/reset-password.service");

describe("ResetPasswordController", () => {
  it("should reset password successfully", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Senha atualizada com sucesso",
    });

    (ResetPasswordService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .post("/auth/reset-password")
      .send({
        token: "token",
        oldPassword: "123",
        newPassword: "456",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Senha atualizada com sucesso");
  });
});