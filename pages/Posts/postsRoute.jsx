import React from 'react'
import FetchPosts from './fetchposts'
import Addposts from './addposts'
import Savedposts from './fetchsavedposts'
import Fetchreportposts from './fetchreportposts'
import MainLayout from '../../src/components/layout'
import Fetchsavedposts from './fetchsavedposts'

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
         },
         {
            path : '/fetchsavedposts',
            element: <Fetchsavedposts />,
         }
     ]
 }

export default postsRoute