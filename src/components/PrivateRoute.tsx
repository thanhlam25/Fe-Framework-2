import { Navigate } from 'react-router-dom';
import { AuthWrapper, useAuth } from '../components/context/auth.context';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const { auth } = useAuth();

    if (!auth.isAuthenticated || auth.user.role != '3') {
        return <Navigate to="/" replace />;
    }
    return element;
};

export default PrivateRoute;
