import React from 'react'
import { Link , useLocation} from 'react-router-dom'
const sidebar = () => {
    const sidebarItems = [
        { name: 'Users', path: '/users' },
        { name: 'Posts', path: '/posts' },
        { name: 'Reports', path: '/reports' },
    ]
  return (
    <>
    <nav style={{backgroundColor : '#FFFF08',borderRight: '1px solid #000000',zIndex:'1'}} className='flex flex-row align-middle fixed top-20 right-0 gap-10 h-10 w-full border-b-2 border-black px-4'>
        {sidebarItems.map((item, idx) => {
            return (
                <Link
                    key={idx}
                    to={item.path}
                    style={{ color: 'black',paddingTop:'5px' }}
                >
                    {item.name}
                </Link>
            )
        })}
    </nav>
    </>
  )
}

export default sidebar