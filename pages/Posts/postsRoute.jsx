import React from 'react'
import FetchPosts from './fetchposts'
import Addposts from './addposts'
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
         }
     ]
 }

export default postsRoute