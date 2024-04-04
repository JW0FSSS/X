import { ICount } from "./count";
import { IUser } from "./user.ts";

export interface IWelcome {
    error:   string;
    data:    IPost[];
    message: string;
}

export interface IPost {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    title:     string;
    content:   string;
    published: boolean;
    userId:    number;
    _count:    ICount;
    user:      IUser;
    liked?: boolean;
}

