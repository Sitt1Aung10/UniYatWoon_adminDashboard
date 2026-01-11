import React from 'react'
import Users from './users'
import Profile from './profile'
import MainLayout from '../../src/components/layout'

const usersRoute = {
 path: '/',
    element:<MainLayout/>,
    children : [
        {
            path: '/users',
            element: <Users />,
        },
        {
            path: '/profile',
            element: <Profile />,
        }
    ]
}

export default usersRoute