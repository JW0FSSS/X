export class AuthError extends Error{
    public status:number=401

    constructor(message:string){
       super(message)
    }
}