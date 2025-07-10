import React, { use } from 'react';
import { AuthContext } from '../AuthContext/AuthCotext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user}=use(AuthContext)

    if (!user){
        return <Navigate to={"/login"}></Navigate>
    }
    return children
       
           
       
   
};

export default PrivateRoute;