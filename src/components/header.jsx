import React from 'react'
import endpoints from '../../endpoints/endpoints';
import { useState, useEffect } from 'react';
const header = () => {
  // const [adminName, setAdminName] = useState('Loading...');

  // useEffect(() => {
  //   fetch(endpoints.admin)
  //     .then(res => res.json())
  //     .then(data => {
  //       setAdminName(data[0].Admin || 'Admin');
  //     })
  //     .catch(() => setAdminName('Error'));
  // }, []);
  return (
    <>
      <header className='w-full h-20 fixed top-0 left-0 px-10 py-5'
        style={{
          backgroundColor: '#3E2E87',
          zIndex: '9',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center'
        }}>
           {/* <h1 style={{position:'absolute',top:'30px',left:'20px',color:'white'}}>Admin : {adminName}</h1> */}
        <h1 style={{ color: '#FFFF08' }} className='uppercase sm:text-2xl md:text-3xl lg:text-4xl'>Uin Yat Won Admin Dashboard</h1>
      </header>
    </>
  )
}

export default header