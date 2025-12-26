import React from 'react'
import Users from './users'
import MainLayout from '../../src/components/layout'

const usersRoute = {
 path: '/',
    element:<MainLayout/>,
    children : [
        {
            path: '/users',
            element: <Users />,
        }
    ]
}

export default usersRoute