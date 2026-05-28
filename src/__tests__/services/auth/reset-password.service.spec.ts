import { ResetPasswordService } from "../../../services/auth/reset-password.service";
import { AuthRepository } from "../../../repositories/auth.repository";
import { compare, hash } from "bcryptjs";

jest.mock("../../../repositories/auth.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("ResetPasswordService", () => {
  let service: ResetPasswordService;
  let authRepositoryMock: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepositoryMock = new AuthRepository() as jest.Mocked<AuthRepository>;
    service = new ResetPasswordService();
  });

  it("should reset password", async () => {
    authRepositoryMock.verifyDecodeToken = jest.fn().mockResolvedValue({
      login: "test@test.com",
    });

    authRepositoryMock.findByLogin = jest.fn().mockResolvedValue({
      id: 1,
      login: "test@test.com",
      senha: "hashed_old",
    });

    (compare as jest.Mock).mockResolvedValue(true);
    (hash as jest.Mock).mockResolvedValue("new_hash");

    authRepositoryMock.updatePassword = jest.fn();

    const result = await service.execute({
      token: "token",
      oldPassword: "123",
      newPassword: "456",
    });

    expect(result.message).toBe("Senha atualizada com sucesso");
  });
});