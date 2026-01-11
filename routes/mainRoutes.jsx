import Layout from '.././src/components/layout';
import Dashboard from '../pages/Dashboard/dashboard';
import Users from '../pages/Users/users';
import Profile from '../pages/Users/profile';
import { Navigate } from 'react-router-dom';

const MainRoutes = {
    path: '/',
    element:<Layout/>,
    children : [
         {
            path: '/',
            element: <Navigate to="/users" replace />
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/profile/:username',
            element: <Profile />,
        }
    ]
}

export default MainRoutes;