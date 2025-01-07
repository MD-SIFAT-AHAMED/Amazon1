import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children }) => {
    const [loggedInUser] = useContext(UserContext);
    const location = useLocation();
    return loggedInUser?.email ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;