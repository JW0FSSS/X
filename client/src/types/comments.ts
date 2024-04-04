import { ICount } from "./count";
import { IUser } from "./user";

export interface IComments{
    createdAt: Date,
    content: string,
    user: IUser,
    _count: ICount,
}