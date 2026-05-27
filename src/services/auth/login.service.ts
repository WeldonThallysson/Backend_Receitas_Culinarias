import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "../../errors/app-error";
import { ILoginRequest } from "../../interfaces/auth.interface";
import { UserRepository } from "../../repositories/user.repository";

class LoginService {
  async execute({ login, password }: ILoginRequest) {
    const userRepository = new UserRepository();
    const user = await userRepository.findByLogin({ login });

    if (!user) {
      throw new AppError("Usuário ou senha inválidos", 401);
    }

    const passwordMatch = await compare(password, user.senha);

    if (!passwordMatch) {
      throw new AppError("Usuário ou senha inválidos", 401);
    }

    const token = sign(
      {
        name: user.nome,
      },
      process.env.JWT_SECRET_KEY!,
      {
        subject: String(user.id),
        expiresIn: "1d",
      }
    );

    return {
      id: user.id,
      token,
      message: `Bem vindo ${user.nome}`,
    };
  }
}

export { LoginService };