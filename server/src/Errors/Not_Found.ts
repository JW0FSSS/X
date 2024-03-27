export class ErrorNotFound extends Error{
    public status:number=404

    constructor(message:string){
       super(message)
    }
}