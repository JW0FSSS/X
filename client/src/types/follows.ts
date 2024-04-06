export interface IFollowings {
    following:IFollow
}

export interface IFollowers {
    isfollowing: boolean,
    follower:IFollow
}


interface IFollow{
    id: number,
    image:string,
    name:string,
    username:string
}