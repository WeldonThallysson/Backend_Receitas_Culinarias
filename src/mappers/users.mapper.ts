import { IUserDb } from "../interfaces/users.interface";
 
export const userMapper = (user: IUserDb) => {
  return {
    id: user.id,
    name: user.nome,
    login: user.login,
    createdAt: user.criado_em,
    updatedAt: user.alterado_em,
  };
};