import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home } from "../pages/Home";


const ProtectedRoutes = () => {
    const trainer = useSelector(state => state.trainer)

    if(trainer === '') {
        return <Navigate to="/" />
    } else {
        return <Outlet />
    }
}

export default ProtectedRoutes;