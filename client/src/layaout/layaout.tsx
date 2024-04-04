import { SideBar } from "../components/Home/SideBar";

export function Layaout({children}) {
    return(
        <section className="bg-black text-white h-full w-full">
            <SideBar/>
            {children}
        </section>
    )
}