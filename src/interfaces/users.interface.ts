export interface IParamsUsersFilters {
  login?: string;
  name?: string;
  created_at_start?: Date;
  created_at_end?: Date;
  updated_at_start?: Date;
  updated_at_end?: Date;
}

export interface ICreateUserData {
  name: string;
  login: string;
  password: string;
}

export interface IUserDb {
  id: number;
  nome: string | null;
  login: string;
  criado_em: Date | null;
  alterado_em: Date | null;
}

export interface IUpdateUserData extends Partial<ICreateUserData> {}
