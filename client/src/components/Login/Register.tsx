import { useState } from "react";
import { fetchRegister } from "../../services/Register";
import { Terms } from "./terms";

export default function Register({isModalOpen,setModal}:{isModalOpen:boolean,setModal: React.Dispatch<React.SetStateAction<boolean>>}) {

  const [create,setCreate]=useState<Record<string,string>>({email:"",password:"",repeat_password:""})
    const [message,setMessage]=useState({msg:"",error:[]})

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const {email,password,repeat_password}=create
    fetchRegister({email,password,repeat_password})
    .then(res=>{  
        setMessage(prev=>({...prev,msg:res.message}))
        setTimeout(() => {
            setMessage(prev=>({...prev,msg:""}))
        }, 2000);
        e.target.reset()
    })
    .catch(errors=>{
        if (errors instanceof Array) {
            const msg=errors.map(e=>Object.values(e))
            setMessage(prev=>({...prev,error:msg}))
        }else{
            setMessage(prev=>({...prev,error:[errors.message]}))
        }
        setTimeout(() => {
            setMessage(prev=>({...prev,error:[]}))
        }, 2000);
    })

}

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value=e.target.value
    setCreate(prev=>({...prev,[e.target.name]:value}))
}

  return (
      <>
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${isModalOpen?"":"hidden"} bg-blue-300/20 bg-opacity-50 backdrop-blur-[3px] fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-w-full max-h-full`}>
            <div className="relative p-4 w-full top-20 left-1/3 ">

                <div className="relative bg-white rounded-lg shadow dark:bg-black max-w-[500px] flex flex-col gap-12 pb-52 px-28 font-semibold text-white/40 ">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h2 className='text-3xl mt-5 text-white'>Crear Cuenta</h2>
                        <button type="button" onClick={()=>setModal(!isModalOpen)} className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className='text-black'  id="new" >
                          <input className='rounded-3xl pl-4 pr-16 py-1 outline-none mb-4' type="email" name='email' placeholder='anonimo@gmail.com' onChange={handleChange}/>
                          <input className='rounded-3xl pl-4 pr-16 py-1 outline-none mb-4' type="password" name='password' placeholder='*********' onChange={handleChange}/>
                          <input className='rounded-3xl pl-4 pr-16 py-1 outline-none' type="password" name='repeat_password' placeholder='*********' onChange={handleChange}/>
                      </form>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button  className='py-2 px-16 bg-secondary  text-white rounded-3xl text-md' form="new">Create Account</button>
                        <div className='text-xs'>
                            <Terms/>
                        </div>
                    </div>

                </div>
            </div>
                        {message.error.length!=0?<div className="fixed right-0 bottom-0 z-50  bg-red-900 px-4 py-2 rounded-lg  w-40 transition-all ease-in-out duration-300"><h1 className="text-center">{message.error[0]}</h1></div>:<div className="fixed right-0 -bottom-20 z-50  bg-red-900 px-4 py-2 rounded-lg  transition-all ease-in-out duration-300 w-40"></div>}
                        {message.msg?<div className="fixed right-0 bottom-0 z-50  bg-green-900 px-4 py-2 rounded-lg  w-40 transition-all ease-in-out duration-300"><h1 className="text-center">{message.msg}</h1></div>:<div className="fixed right-0 -bottom-20 z-50  bg-green-900 px-4 py-2 rounded-lg  transition-all ease-in-out duration-300 w-40"></div>}
        </div>
      </>

  )
}
