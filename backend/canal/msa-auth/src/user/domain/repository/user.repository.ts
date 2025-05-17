import { User, UserProperties } from '../entities/user.entity';
  
export interface IUserRepository {
create(user : User): Promise<User>
get(id : string): Promise<User>
getList(): Promise<User[]>
update(id : string, user : Partial<UserProperties>): Promise<void>
delete(id : string): Promise<void>
findUser(where: { [s: string]: string | number }): Promise<User | null>;
/* getByPage(page: number, pageSize: number): Promise<UserGetByPageResult>; */
}
