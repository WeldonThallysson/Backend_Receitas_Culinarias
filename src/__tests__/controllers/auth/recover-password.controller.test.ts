import request from "supertest";
import { app } from "../../../app";
import { RecoverPasswordService } from "../../../services/auth/recover-password.service";

jest.mock("../../../services/auth/recover-password.service");

describe("RecoverPasswordController", () => {
  it("should return reset token", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      canResetPassword: true,
      resetToken: "reset-token",
      message: "Recuperação de senha liberada",
    });

    (RecoverPasswordService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app)
      .post("/auth/recover-password")
      .send({ login: "test@email.com" });

    expect(response.status).toBe(200);
    expect(response.body.canResetPassword).toBe(true);
  });
});