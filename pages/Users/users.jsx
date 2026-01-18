import React, { useState, useEffect } from 'react';
import endpoints from '../../endpoints/endpoints';
import { BASE_URL } from '../../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalusers] = useState(0);
    const [banLoadingUUID, setBanLoadingUUID] = useState(null);
    const isBanned = (banUntil) => {
        if (!banUntil) return false;
        return new Date(banUntil).getTime() > Date.now();
    };


    const navigate = useNavigate();

    /* 🔄 Fetch users */
    const fetchUsers = () => {
        fetch(endpoints.users, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data.users || []);
                setTotalusers(data.total_users || 0);
            })
            .catch(err => {
                console.error(err);
                setUsers([]);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* 🚫 Ban / Unban user by UUID */
    const handleban_unban = async (e, user_uuid) => {
        e.preventDefault();

        if (!window.confirm('Are you sure you want to ban/unban this user?')) {
            return;
        }

        setBanLoadingUUID(user_uuid);

        try {
            const res = await fetch(endpoints.ban_account, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_uuid: user_uuid
                })
            });

            if (!res.ok) {
                throw new Error("Failed to ban/unban account");
            }

            const data = await res.json();

            /* 🔁 Update UI instantly */
            setUsers(prev =>
                prev.map(u =>
                    u.user_uuid === user_uuid
                        ? { ...u, Ban_until: data.Ban_until }
                        : u
                )
            );

        } catch (err) {
            console.error(err);
        } finally {
            setBanLoadingUUID(null);
            fetchUsers(); // keep backend as source of truth
        }
    };

    return (
        <>
            <h1>User Lists</h1>
            <h2>Total Users: {totalUsers}</h2>

            <div className="userList">
                {users.map(user => (
                    <div key={user.user_uuid} className="userCard">

                        <div>
                            <img
                                src={`${BASE_URL}/${encodeURI(user.Profile_photo)}`}
                                alt={user.Username}
                            />

                            <div>
                                <h1>{user.Username}</h1>
                                <h1>{user.Major}</h1>
                                <h1>{user.Year} Year</h1>
                            </div>
                        </div>

                        <br />

                        <div>
                            <div>
                                <h1>Phone : {user.Phone}</h1>
                                <h1>Email : {user.Email}</h1>
                            </div>

                            <div style={{ width: '1px', height: '100px', backgroundColor: '#000' }} />

                            <div>
                                <button
                                    onClick={() => navigate(`/profile/${user.user_uuid}`)}
                                >
                                    View Activity Logs
                                </button>

                                <br /><br />
                                <button
                                    type="button"
                                    onClick={(e) => handleban_unban(e, user.user_uuid)}
                                    disabled={banLoadingUUID === user.user_uuid || isBanned(user.Ban_until)}
                                    style={{
                                        opacity:
                                            banLoadingUUID === user.user_uuid || isBanned(user.Ban_until)
                                                ? 0.6
                                                : 1,
                                        cursor:
                                            banLoadingUUID === user.user_uuid || isBanned(user.Ban_until)
                                                ? 'not-allowed'
                                                : 'pointer'
                                    }}
                                >
                                    {banLoadingUUID === user.user_uuid
                                        ? 'Banning...'
                                        : isBanned(user.Ban_until)
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
