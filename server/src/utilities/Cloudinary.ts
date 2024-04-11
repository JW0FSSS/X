import { v2 as cloudinary } from "cloudinary";


export async function UploadImage({buffer}:{buffer:any}) {
    const res=await new Promise((resolve)=>{
        cloudinary.uploader.upload_stream({resource_type:"auto"},(error, result) => {
            return resolve(result)
        }).end(buffer);
        })
      
    return res.url
}