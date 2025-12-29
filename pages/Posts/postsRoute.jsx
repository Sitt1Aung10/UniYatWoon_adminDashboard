import React from 'react'
import FetchPosts from './fetchposts'
import Addposts from './addposts'
import Fetchreportposts from './fetchreportposts'
import MainLayout from '../../src/components/layout'

const postsRoute =  {
 path: '/',
     element:<MainLayout/>,
     children : [
         {
             path: '/posts',
             element: <FetchPosts />,
         },
         {
            path: '/addposts',
            element: <Addposts />,
         },
         {
            path : '/reports',
            element: <Fetchreportposts />,
         }
     ]
 }

export default postsRoute