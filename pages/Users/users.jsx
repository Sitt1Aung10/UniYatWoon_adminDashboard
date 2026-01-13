import React, { useState, useEffect } from 'react';
import endpoints from '../../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';
import Profile from './profile';
import '../../src/App.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalusers] = useState(0);
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [banLoadingName, setBanLoadingName] = useState(null);
    // useEffect(() => {
    //     fetch(endpoints.users)
    //         .then(res => res.json())
    //         .then(data => {
    //             setUsers(data.users); // 👈 store ALL rows
    //             setTotalusers(data.total_users); // 👈 get total count
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             setUsers([]);
    //         });
    // }, []);
    const navigate = useNavigate();
    const fetchUsers = () => {
        fetch(endpoints.users, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setTotalusers(data.total_users);
            })
            .catch(err => console.error(err));

    };
    useEffect(() => {
        fetchUsers(); // ✅ same as before
    }, []);


    const handleban_unban = async (e, Username) => {
        e.preventDefault();
        setBanLoadingName(Username)
        if (!window.confirm('Are you sure you want to ban/unban this user?')) return;

        try {
            const res = await fetch(endpoints.ban_account, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username: Username   // 🔴 MUST match PHP key
                })
            });

            if (!res.ok) throw new Error("Failed to ban/unban account");

            const data = await res.json();

            console.log("BAN/UNBAN RESPONSE:", data);
            console.log("USERNAME SENT:", Username);
            setUsers(prev =>
                prev.map(u =>
                    u.Username === Username
                        ? { ...u, Ban_until: data.Ban_until }
                        : u
                )
            );

        } catch (err) {
            console.error(err);
        }
        finally {
            setBanLoadingName(null);
            fetchUsers();
        }
    };


    return (
        <>
            <h1>User Lists</h1>
            <h2>Total Users: {totalUsers}</h2>
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
                            <div style={{ width: '1px', height: '100px', backgroundColor: '#000' }}></div>
                            <div>
                                <button onClick={() => navigate(`/profile/${user.Username}`)}>View Activity Logs</button><br></br><br></br>
                                    <button onClick={(e) => handleban_unban(e, user.Username)} type='button'
                                    style={{
                                        opacity: banLoadingName === user.Username || user.Ban_until ? 0.6 : 1,
                                        cursor: banLoadingName === user.Username || user.Ban_until ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {banLoadingName === user.Username
                                        ? 'Banning...'
                                        : user.Ban_until
                                            ? 'Banned'
                                            : 'Ban'}
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
};

export default Users;
