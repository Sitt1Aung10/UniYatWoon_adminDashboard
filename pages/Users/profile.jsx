import React from 'react'
import endpoints from '../../endpoints/endpoints';
import { useState, useEffect } from 'react';
import { data } from 'autoprefixer';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const cleanUsername = username.trim();
      try {
        // ✅ append username as query param
        const res = await fetch(`${endpoints.profile}?Username=${encodeURIComponent(cleanUsername)}`, {
          method: "GET", // GET is fine for $_GET
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [username]);


  return (
    <>
      {!userProfile ? (
        <p>Loading profile...</p>
      ) : (
        <div>
          {/* Posts */}
          {userProfile.posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            userProfile.posts.map(post => (
              <div key={post.id} className="postCard">
                <h3>{post.Username}</h3>
                <p>{post.Major}</p>
                <img src={`http://localhost/UniYatWoon_AdminPanel/${post.Profile_photo}`} alt="Profile" className="profilePicture"/>
                <p>{post.Description}</p>

                {/* Media */}
                {post.media && post.media.length > 0 && (
                  <div className="mediaContainer">
                    {post.media.map((m, index) => (
                      <img
                        key={index}
                        src={`http://localhost/UniYatWoon_AdminPanel/${m.Media_url}`}
                        alt="post media"
                      />
                    ))}
                  </div>
                )}

                <small>{post.Created_at}</small>
              </div>
            ))
          )}
        </div>
      )}
    </>

  )
}

export default Profile