import { LoginService } from "../../../services/auth/login.service";  
import { UserRepository } from "../../../repositories/user.repository"; 
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

jest.mock("../../../repositories/user.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("LoginService", () => {
  let service: LoginService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    service = new LoginService(userRepositoryMock);

    process.env.JWT_SECRET_KEY = "secret";
  });

  it("should login successfully", async () => {
    userRepositoryMock.findByLogin = jest.fn().mockResolvedValue({
      id: 1,
      nome: "Test",
      login: "test@test.com",
      senha: "hashed_password",
    });

    (compare as jest.Mock).mockResolvedValue(true);
    (sign as jest.Mock).mockReturnValue("token123");

    const result = await service.execute({
      login: "test@test.com",
      password: "123456",
    });

    expect(result).toHaveProperty("token");
    expect(result.id).toBe(1);
  });

  it("should throw if user not found", async () => {
    userRepositoryMock.findByLogin = jest.fn().mockResolvedValue(null);

    await expect(
      service.execute({
        login: "test@test.com",
        password: "123456",
      }),
    ).rejects.toThrow("Usuário inválido");
  });
});