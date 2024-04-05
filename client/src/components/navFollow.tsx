import { Link } from "react-router-dom";
import { IUser } from "../types/user";

export function NavFollow({user}:{user:IUser}) {
    const lastpathPage=window.location.pathname.split('/').pop()
    return(
        <nav className="grid grid-cols-2 py-3">
                    <Link to={`/user/${user.username}/followings`} className={` text-center`}><span className={`${lastpathPage=="followings"?"border-b-2 border-blue-700":""}`}>Following</span></Link>
                    <Link to={`/user/${user.username}/followers`} className="text-center"><span className={`${lastpathPage=="followers"?"border-b-2 border-blue-700":""}`}>Followers</span></Link>
        </nav>
    )
}