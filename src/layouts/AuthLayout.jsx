import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div>
           Auth layouts
           <Outlet></Outlet> 
        </div>
    );
};

export default AuthLayout;