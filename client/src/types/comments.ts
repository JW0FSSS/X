import { ICount } from "./count";
import { IUser } from "./user";

export interface IComments{
    id:number
    createdAt: Date,
    content: string,
    user: IUser,
    _count: ICount,
    liked:boolean
}