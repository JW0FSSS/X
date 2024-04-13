import { useSelector } from "react-redux"
import { fetchPost } from "../../services/post"
import { useRef, useState } from "react"
import { RootState } from "../../store/store"
import { Link } from "react-router-dom"
import { Picture } from "../../icons/picture"

export function Post() {
    
    const [post,setPost]=useState({content:""})
    const [file,setFile]=useState(null)
    const input=useRef(null)
    const [image,setImage]=useState(null)
    const [isloadingPost,setLoading]=useState(false)
    const user=useSelector((state:RootState)=>state.user)

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const content=e.target.value
        setPost(prev=>({...prev,content}))
    }

    const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setImage(e.target.files[0])
        setFile(e.target.files[0])
    }
    
    const handleSubmit=(e: React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        setLoading(prev=>true)
        const formData=new FormData()
        const {content}=post

        formData.append('file',file)
        formData.append('content',content)
    
        fetchPost({token:user.token,formData})
        .then(res=>console.log(res))
        setTimeout(() => {
            setImage(null)
            e.target.reset()
            setLoading(prev=>false)
        }, 500);
    }

    const handleClick = () => {
        input.current.click();
      };

      const handelReset=()=>{
        setImage("")
        setFile(null)
        input.current.value=""
      }


    return(
        <form className="w-full -pr-5 border-b-[1px] p-5 border-white/30" onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-5 flex-wrap text-xl">
                <Link to={`/user/${user.username}`}>
                    <img src={`${user.image?user.image:"https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}`} alt="" className="rounded-full size-10"/>
                </Link>
                <input onChange={handleChange} placeholder="¿What is happening?!!"  className={`resize-none bg-transparent w-5/6 ${image?"":"border-b-[1px]"} border-white/30 focus:outline-none pb-10`}></input>
                <div className="w-full flex justify-center relative">
                    {image?<button className="absolute top-0 right-0 hover:bg-white/20 px-2 rounded-full" onClick={handelReset}>X</button>:null}
                    {image?<img src={URL.createObjectURL(image)} alt="" className="rounded-3xl w-11/12" />:null}
                </div>
            </div>
          <div className="flex justify-between  items-center mx-5 mb-2">
            <div className="">
                <label className="cursor-pointer" onClick={handleClick}><Picture/></label>
                <input type="file"onChange={handleFile} ref={input} style={{display: 'none'}}  />
            </div>
            <button type="submit" disabled={isloadingPost} className={`${isloadingPost?"bg-secondary/50":"bg-secondary"} hover:bg-opacity-85 transition-opacity duration-300 rounded-3xl px-4 py-2`}>{isloadingPost?"Posting":"Post"}</button>
          </div>
        </form>
    )
}