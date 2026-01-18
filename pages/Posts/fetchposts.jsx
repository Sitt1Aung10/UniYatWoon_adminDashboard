import React, { useState, useEffect } from 'react';
import endpoints, { BASE_URL } from '../../endpoints/endpoints';
import Reportposts from './reportposts';
import Comments from './comments';
import '../Posts/postCss.css';

/* ===================== AUTH HELPER ===================== */
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Fetchposts = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('normal');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [savingPostId, setSavingPostId] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);

  /* ===================== FETCH POSTS ===================== */
useEffect(() => {
  fetch(`${endpoints.fetchposts}?type=${activeTab}`, {
    headers: {
      ...getAuthHeader()
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("FETCH POSTS RESPONSE:", data);
      // Set posts array safely
      if (Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        setPosts([]);
      }
    })
    .catch(err => {
      console.error(err);
      setPosts([]);
    });
}, [activeTab]);


  const mediaStyle = {
    minWidth: "330px",
    objectFit: "contain",
    scrollSnapAlign: "start"
  };

  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: "5px",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 2,
  });

  /* ===================== SAVE POST ===================== */
  const handleSavePost = async (postId) => {
    try {
      setSavingPostId(postId);

      const res = await fetch(endpoints.savedposts, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...getAuthHeader()
        },
        body: new URLSearchParams({ post_id: postId }),
      });

      const data = await res.json();

      if (data.success) {
        setSavedPosts(prev => [...prev, postId]);
      } else {
        alert(data.message || "Failed to save post");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving the post");
    } finally {
      setSavingPostId(null);
    }
  };

  return (
    <div>
      {/* ===================== TABS ===================== */}
      <div className="tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          className={activeTab === 'normal' ? 'active' : ''}
          onClick={() => setActiveTab('normal')}
        >
          Posts
        </button>
        <button
          className={activeTab === 'lost_found' ? 'active' : ''}
          onClick={() => setActiveTab('lost_found')}
        >
          Lost & Found
        </button>
        <button
          className={activeTab === 'announcement' ? 'active' : ''}
          onClick={() => setActiveTab('announcement')}
        >
          Announcements
        </button>
      </div>

      {/* ===================== POSTS ===================== */}
      <div className='post_container'>
        {posts.map(post => (
          <div className='postCard' key={post.id} style={{ marginBottom: "2rem" }}>
            <h1 className='username'>{post.Username}</h1>
            <h1 className='created_at'>{post.Created_at}</h1>

            <img
              className='pf'
              src={`${BASE_URL}/${encodeURI(post.Profile_photo)}`}
              alt=""
            />

            <p style={{
              maxHeight: expandedPost === post.id ? "1000px" : "25px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}>
              {post.Description}
            </p>

            {post.Description.length > 100 && (
              <span
                onClick={() =>
                  setExpandedPost(expandedPost === post.id ? null : post.id)
                }
                style={{
                  color: "#1877f2",
                  cursor: "pointer",
                  fontSize: "14px",
                  zIndex: 9
                }}
              >
                {expandedPost === post.id ? "See less" : "See more"}
              </span>
            )}

            {/* ===================== MEDIA ===================== */}
            <div className='media_container'>
              {post.media.length > 0 && (
                <div style={{ position: "relative", width: "300px" }}>
                  <button
                    onClick={(e) =>
                      e.currentTarget.nextSibling.scrollBy({
                        left: -330,
                        behavior: "smooth"
                      })
                    }
                    style={arrowStyle("left")}
                  >
                    ‹
                  </button>

                  <div
                    className="hide-scrollbar"
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      scrollSnapType: "x mandatory"
                    }}
                  >
                    {post.media.map((m, idx) =>
                      m.Media_type === "image" ? (
                        <img
                          key={idx}
                          src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                          alt=""
                          style={mediaStyle}
                        />
                      ) : (
                        <video
                          key={idx}
                          controls
                          src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                          style={mediaStyle}
                        />
                      )
                    )}
                  </div>

                  <button
                    onClick={(e) =>
                      e.currentTarget.previousSibling.scrollBy({
                        left: 330,
                        behavior: "smooth"
                      })
                    }
                    style={arrowStyle("right")}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            <button
              className='reportBtn'
              onClick={() => setSelectedPostId(post.id)}
            >
              Report Post
            </button>

            <button
              className='commentBtn'
              onClick={() => setComments(post.id)}
            >
              Comments
            </button>

            <button
              className='saveBtn'
              onClick={() => handleSavePost(post.id)}
              disabled={savingPostId === post.id || savedPosts.includes(post.id)}
            >
              {savedPosts.includes(post.id)
                ? "Saved ✅"
                : savingPostId === post.id
                  ? "Saving..."
                  : "Save Post"}
            </button>

            {selectedPostId === post.id && (
              <Reportposts
                post_id={post.id}
                onReportComplete={() => setSelectedPostId(null)}
              />
            )}

            {comments === post.id && (
              <Comments
                post_id={post.id}
                commentComplete={() => setComments(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetchposts;
