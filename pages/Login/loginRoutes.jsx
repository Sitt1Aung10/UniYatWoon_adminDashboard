import React from 'react'
import Login from './login'
import MainLayout from '../../src/components/layout'

const usersRoute = {
 path: '/',
    element:<MainLayout/>,
    children : [
        {
            path: '/login',
            element: <Login />,
        }
    ]
}

export default usersRoute