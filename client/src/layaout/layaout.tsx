import { useSelector } from "react-redux";
import { FollowCard } from "../components/Home/FollowsCard";
import { SideBar } from "../components/Home/SideBar";
import { usefetchUsers } from "../services/users";
import { RootState } from "../store/store";

export function Layaout({children}) {
    
    const user=useSelector((state:RootState)=>state.user)
    const {errorUsers,isloadingUsers,sugerency}=usefetchUsers({token:user.token})
    
    if (isloadingUsers) return  <h1 className="text-center py-10">Loading...</h1>

    return(
        <section className="bg-black text-[#e2e4e5] h-full w-full">
            <SideBar/>
            {children}
            <section className="fixed py-5 w-[400px] top-4 right-52 flex flex-col justify-center  bg-white/10 rounded-xl">
        {!isloadingUsers&&sugerency.length<1?<h1 className="text-center">"soon suggestions"</h1>:sugerency.map(e=><FollowCard user={e} token={user.token}/>)}
      </section>
      
        </section>
    )
}