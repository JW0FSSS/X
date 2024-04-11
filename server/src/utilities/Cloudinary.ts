import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure:true
});

export async function UploadImage({buffer}:{buffer:any}) {
    const res=await new Promise((resolve)=>{
        cloudinary.uploader.upload_stream({resource_type:"auto"},(error, result) => {
            return resolve(result)
        }).end(buffer);
        })
      
    return res.url
}