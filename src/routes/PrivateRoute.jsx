import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading />
    }

      if(user && user?.email){
        return children;
      }else{
        return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
      }
};

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
}
export default PrivateRoute;