import React, { useState, useEffect } from 'react';
import endpoints from '../../endpoints/endpoints';
import '../../src/App.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(endpoints.users)
            .then(res => res.json())
            .then(data => {
                setUsers(data); // 👈 store ALL rows
            })
            .catch(err => {
                console.error(err);
                setUsers([]);
            });
    }, []);


    return (
        <>
            <h1>User Lists</h1>

            <div className='userList'>
                {users.map(user => (
                    <div key={user.id} className="userCard">
                        <div>
                            <img
                                src={`http://localhost/UniYatWoon_AdminPanel/${user.Profile_photo}`}
                                alt={user.Username}
                            />
                            <div>
                                <h1> {user.Username}</h1>
                                <h1> {user.Major}</h1>
                                <h1> {user.Year} Year</h1>
                            </div>
                        </div><br></br>
                        <div>
                            <div>
                                <h1>Phone : {user.Phone}</h1>
                                <h1>Email : {user.Email}</h1>
                            </div>
                            <div style={{width:'1px',height:'100px',backgroundColor:'#000'}}></div>
                            <div>
                                <button>View Activity Logs</button><br></br><br></br>
                                <button style={{backgroundColor:'red',fontWeight:'bolder'}}>Ban The Account</button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
};

export default Users;
