import { ICount } from "./count";
import { IUser } from "./user";

export interface Welcome {
    error:   string;
    data:    IData;
    message: string;
}

export interface IData {
    feed: IFeed[];
}

export interface IFeed {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    image:     string;
    content:   string;
    published: boolean;
    userId:    number;
    _count:    ICount;
    user:      IUser;
    liked:     boolean;
}



