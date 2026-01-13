import React from 'react'
import endpoints from '../../endpoints/endpoints'
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../endpoints/endpoints'
import '../Posts/postCss.css'

const Fetchsavedposts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(endpoints.fetchsavedposts)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch saved posts");
        return res.json();
      })
      .then(data => {
        // Safety: guarantee media exists
        const normalized = data.map(r => ({
          ...r,
          media: Array.isArray(r.media) ? r.media : []
        }));

        setSavedPosts(normalized);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load reports");
      })
      .finally(() => setLoading(false));
  }, []);

    const mediaStyle = {
    minWidth: "330px",
    objectFit: "contain",
    scrollSnapAlign: "start",
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


  return (
    <div className="reportpost_container">
      {savedPosts.length === 0 && <p>No saved posts found.</p>}

      {savedPosts.map(saved => (
        <div className="reportpostCard" key={saved.id}>
          <h2>Saved Post</h2>

          <p><strong>Post Owner : {saved.Username} </strong></p>
          <p
            style={{
              maxHeight: expandedPost === saved._post_id ? "1000px" : "20px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            {saved.Description}
          </p>

          {/* MEDIA */}
          {/* MEDIA */}
          {saved.media.length > 0 && (
            <div style={{ position: "relative", width: "330px" }}>

              {/* LEFT ARROW */}
              <button
                onClick={(e) => {
                  const box = e.currentTarget.nextSibling;
                  box.scrollBy({ left: -330, behavior: "smooth" });
                }}
                style={arrowStyle("left")}
              >
                ‹
              </button>

              {/* MEDIA CONTAINER */}
              <div
                className="hide-scrollbar"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                }}
              >
                {saved.media.map((m, idx) =>
                  m.Media_type === "image" ? (
                    <img
                      key={idx}
                      src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                      alt="post media"
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

              {/* RIGHT ARROW */}
              <button
                onClick={(e) => {
                  const box = e.currentTarget.previousSibling;
                  box.scrollBy({ left: 330, behavior: "smooth" });
                }}
                style={arrowStyle("right")}
              >
                ›
              </button>

              <br />
            </div>
          )}

        </div>
      ))}
    </div>
  );
}

export default Fetchsavedposts