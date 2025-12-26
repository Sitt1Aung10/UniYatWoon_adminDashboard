import { useState, useEffect } from 'react';
import endpoints from '../../endpoints/endpoints';

function Profile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch(
      (endpoints.get_session), {
      method: 'GET',
      credentials: 'include',
      headers: {
          "Content-Type": "application/json"
        },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsername(data.Username);
      });
  }, []);

  return (
    <h1 className="name">{username ? `${username}'s Profile` : "Guest's Profile"}</h1>
  );
}

export default Profile;
