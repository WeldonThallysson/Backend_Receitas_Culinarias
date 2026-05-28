import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/app-error";
import { ILoginRequest } from "../../interfaces/auth.interface";
import { UserRepository } from "../../repositories/user.repository";
import { isValidCPF, isValidEmail } from "../../utils/validators";
import { normalizeCharacter } from "../../utils/normalizers/character";

class LoginService {
  constructor(private userRepository = new UserRepository()) {}

  async execute({ login, password }: ILoginRequest) {
    let normalizedLogin = login.trim().toLowerCase();

    const emailValidated = isValidEmail(normalizedLogin);
    const cpfValidated = isValidCPF(normalizedLogin);

    if (!emailValidated && !cpfValidated) {
      throw new AppError("Login deve ser um e-mail ou CPF válido", 400);
    }

    if (normalizedLogin && cpfValidated) {
      normalizedLogin = normalizeCharacter(normalizedLogin);
    }

    const user = await this.userRepository.findByLogin({ login: normalizedLogin });

    if (!user) {
      throw new AppError("Usuário inválido", 401);
    }

    const passwordMatch = await compare(password, user.senha);

    if (!passwordMatch) {
      throw new AppError("Senha inválida", 401);
    }

    const token = sign(
      {
        name: user.nome,
      },
      process.env.JWT_SECRET_KEY!,
      {
        subject: String(user.id),
        expiresIn: "1d",
      },
    );

    return {
      id: user.id,
      token,
      message: `Bem vindo ${user.nome}`,
    };
  }
}

export { LoginService };
