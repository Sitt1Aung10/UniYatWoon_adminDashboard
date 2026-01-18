import React, { useState, useEffect } from 'react';
import endpoints, { BASE_URL } from '../../endpoints/endpoints';
import { useParams } from 'react-router-dom';

/* ===================== AUTH HELPER ===================== */
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user_uuid } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = user_uuid
          ? `${endpoints.profile}?user_uuid=${encodeURIComponent(user_uuid.trim())}`
          : endpoints.profile;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            ...getAuthHeader() // ✅ JWT (optional)
          }
        });

        const data = await res.json();
        console.log("PROFILE RESPONSE:", data);

        // ✅ always normalize shape
        setUserProfile({
          isOwnProfile: !!data.isOwnProfile,
          posts: Array.isArray(data.posts) ? data.posts : []
        });

      } catch (err) {
        console.error(err);
        setUserProfile({ isOwnProfile: false, posts: [] });
      }
    };

    fetchProfile();
  }, [user_uuid]);

  if (!userProfile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      {/* ===================== POSTS ===================== */}
      {userProfile.posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        userProfile.posts.map(post => (
          <div key={post.id} className="postCard">
            <h3>{post.Username}</h3>
            <p>{post.Major}</p>

            <img
              src={
                post.Profile_photo
                  ? `${BASE_URL}/${encodeURI(post.Profile_photo)}`
                  : `${BASE_URL}/uploads/default-profile.png`
              }
              alt="Profile"
              className="profilePicture"
            />


            <p>{post.Description}</p>

            {/* ===================== MEDIA ===================== */}
            {Array.isArray(post.media) && post.media.length > 0 && (
              <div className="mediaContainer">
                {post.media.map((m, index) =>
                  m.Media_type === "image" ? (
                    <img
                      key={index}
                      src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                      alt="post media"
                    />
                  ) : (
                    <video
                      key={index}
                      controls
                      src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                    />
                  )
                )}
              </div>
            )}

            <small>{post.Created_at}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
