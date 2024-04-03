export class ErrorRequest extends Error{
    public status:number=400

    constructor(message:string){
       super(message)
    }
}