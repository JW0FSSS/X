
import { Link, Navigate } from 'react-router-dom'
import { X } from '../icons/x'
import { useState } from 'react'
import { fetchLogin } from '../services/Login'
import { useDispatch, useSelector } from 'react-redux'
import { setToken} from "../store/userSlice";
import Register from './Register'

export default function Login() {

    const [login,setLogin]=useState<Record<string,string>>({email:"",password:""})
    const [isModalOpen,setModal]=useState(false)
    const user=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {email,password}=login
        fetchLogin({email,password})
        .then(res=>{
            const {token}=res.data
            dispatch(setToken({token}))
    })
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value
        setLogin(prev=>({...prev,[e.target.name]:value}))
    }

    const handleModal=()=>{
        setModal(!isModalOpen)
    }

  return (
    <section className='bg-black text-white w-screen h-full' id="square">
            {user.token?<Navigate to="/home" replace={true}/>:""}
            <div id='section1' className='h-[900px] flex items-center justify-end'><X size={96}/></div>
            <div id='section2' className='h-[900px] flex items-center justify-center'>
                <div className=' max-w-[500px]'>

                <h1 className='text-6xl mb-10 font-bold'>Lo que está pasando ahora</h1>
                <div className='max-w-[330px] flex flex-col gap-5  font-semibold'>

                    <h2 className='text-3xl mt-5'>Unete hoy</h2>
                    <form  className='text-black' id='login' onSubmit={handleSubmit}>
                        <input className='rounded-3xl pl-4 pr-32 py-1 mb-4' type="email" name='email' placeholder='anonimo@gmail.com' onChange={handleChange}/>
                        <input className='rounded-3xl pl-4 pr-32 py-1' type="password" name='password' placeholder='*********' onChange={handleChange}/>
                    </form>
                    <div className='text-white/60 flex items-center'>
                        <div className='w-[150px] border-b-2  border-white/60 inline-block'></div>
                        <div className='mx-2'>o</div>                        
                        <div className='min-w-[150px] border-b-2 border-white/60 inline-block '></div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button onClick={handleModal} className='py-2 px-28 bg-secondary rounded-3xl'>Crear Account</button>
                        <div className='text-xs '>
                            <p>Al registrarte, aceptas los<span className='text-secondary'> Términos de servicio </span>y 
                                la <span className='text-secondary'>Política de privacidad</span>, incluida la política de
                                <span className='text-secondary'>Uso de Cookies.</span>
                            </p>
                        </div>
                    </div>
                    
                    <h4 className='mt-10'>¿Ya tienes cuenta?</h4>
                    <button className='text-secondary border-2 border-white/40 rounded-3xl px-20 py-2' type='submit' form='login'>Iniciar sesion</button>
                    </div>
                </div>
                {isModalOpen?<Register isModalOpen={isModalOpen} setModal={setModal}/>:""}
                
            </div>
            <div id='foot' className='text-white/60 text-sm text-center'>
                <p>Información
                    Descarga la app de X
                    Centro de Ayuda
                    Condiciones de Servicio
                    Política de Privacidad
                    Política de cookies
                    Accesibilidad
                    Información de anuncios
                    Blog
                    Empleos
                    Recursos para marcas
                    Publicidad
                    Marketing
                    X para empresas
                    Desarrolladores
                    Guía
                    Configuración
                    © 2024 X Corp.
                </p>
            </div>

    </section>
  )
}
