import { RegisterService } from "../../../services/auth/register.service";
import { UserRepository } from "../../../repositories/user.repository";
import { hash } from "bcryptjs";

jest.mock("../../../repositories/user.repository");
jest.mock("bcryptjs");

describe("RegisterService", () => {
  let service: RegisterService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    service = new RegisterService(userRepositoryMock);
  });

  it("should create user", async () => {
    userRepositoryMock.findByLogin = jest.fn().mockResolvedValue(null);
    userRepositoryMock.create = jest.fn();

    (hash as jest.Mock).mockResolvedValue("hashed_password");

    const result = await service.execute({
      name: "Test",
      login: "test@test.com",
      password: "123456",
    });

    expect(result.message).toBe("Cadastro realizado com sucesso");
  });
});