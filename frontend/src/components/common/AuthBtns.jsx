import { Link, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import { toast } from "react-toastify"


export const AuthBtns=()=>{
    const {user,loading,logOut}= useAuth()
    const navigate = useNavigate()
    const handleLogout= ()=>{
        logOut().then(()=>{
            toast.success("Logout successful")
            navigate("/")
        }).catch((error)=>{
            toast.error(error.message)
        })
    }
    return (
       <>
       {loading?(
        <button className="btn btn-ghost">Loading...</button>
       ):(
        user?(
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        ):(
            <>
            <Link to="/login" className="btn btn-primary">Login</Link>
            </>
        )
       )}
       </>
    )
}