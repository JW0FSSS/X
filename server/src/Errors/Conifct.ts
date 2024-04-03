export class ConflictError extends Error{
    public status:number=409

    constructor(message:string){
        super(message)
    }
}