import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <span className="loading loading-infinity loading-lg"></span>;
    }
    
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivateRoutes;