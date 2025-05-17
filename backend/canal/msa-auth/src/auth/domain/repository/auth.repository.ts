import { Auth } from "../entities/auth.entity";
import { User } from "../../../user/domain/entities/user.entity";

export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export interface IAuthRepository {
  register(auth: Auth): Promise<User>
  findUser(where: { [s: string]: string | number }): Promise<User | null>;
}
