
import { useAppSelector } from "@/redux/app/hook";
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";

interface IProps{
    children:ReactNode
}

 const PrivetRoute = ({children}:IProps) => {
    const {user} = useAppSelector((state)=>state.auth)
const {pathname}= useLocation()
    //  if (isLoading) {
    //      return <p>Loading...</p>
    //  }
     if (!user.email) {
         return <Navigate to='/login' state={{ path:pathname}}/>
     }
     return children;
}
 
export default PrivetRoute