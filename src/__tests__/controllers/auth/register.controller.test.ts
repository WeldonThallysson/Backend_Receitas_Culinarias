import request from "supertest";
import { app } from "../../../app";
import { RegisterService } from "../../../services/auth/register.service";
jest.mock("../../../services/auth/register.service");

describe("RegisterController", () => {
  it("should register user successfully", async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      message: "Cadastro realizado com sucesso",
    });

    (RegisterService as jest.Mock).mockImplementation(() => {
      return { execute: mockExecute };
    });

    const response = await request(app).post("/auth/register").send({
      name: "João",
      login: "test@email.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Cadastro realizado com sucesso");
  });
});