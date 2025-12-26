import Layout from '.././src/components/layout';
import Dashboard from '../pages/Dashboard/dashboard';
import { Navigate } from 'react-router-dom';

const MainRoutes = {
    path: '/',
    element:<Layout/>,
    children : [
         {
            path: '/',
            element: <Navigate to="/dashboard" replace />
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
    ]
}

export default MainRoutes;