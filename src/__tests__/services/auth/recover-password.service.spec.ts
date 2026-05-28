import { RecoverPasswordService } from "../../../services/auth/recover-password.service";
import { UserRepository } from "../../../repositories/user.repository";
import { sign } from "jsonwebtoken";

jest.mock("../../../repositories/user.repository");
jest.mock("jsonwebtoken");

describe("RecoverPasswordService", () => {
  let service: RecoverPasswordService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    service = new RecoverPasswordService(userRepositoryMock);
  });

  it("should generate reset token", async () => {
    userRepositoryMock.findByLogin = jest.fn().mockResolvedValue({
      id: 1,
      login: "test@test.com",
    });

    (sign as jest.Mock).mockReturnValue("reset_token");

    const result = await service.execute("test@test.com");

    expect(result.resetToken).toBe("reset_token");
  });

  it("should throw if user not found", async () => {
    userRepositoryMock.findByLogin = jest.fn().mockResolvedValue(null);

    await expect(service.execute("test@test.com")).rejects.toThrow();
  });
});