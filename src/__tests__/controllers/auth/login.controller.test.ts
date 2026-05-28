import request from "supertest";
import { app } from "../../../app";
import { LoginService } from "../../../services/auth/login.service"; 

jest.mock("../../../services/auth/login.service");

describe("LoginController", () => {
  it("should return token on login success", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      id: 1,
      token: "fake-token",
      message: "Bem vindo João",
    });

    (LoginService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).post("/auth/login").send({
      login: "test@email.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("fake-token");
  });
});