import React from 'react'
import endpoints from '../../endpoints/endpoints'
import { BASE_URL } from '../../endpoints/endpoints';
import { useState, useEffect } from 'react';
import Reportposts from './reportposts';
import '../Posts/postCss.css';

const Fetchposts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [expandedPost, setExpandedPost] = useState(null);
    const [savingPostId, setSavingPostId] = useState(null); // tracks loading
    const [savedPosts, setSavedPosts] = useState([]);       // track saved posts



    // <Fetchposts onReport={setSelectedPostId} />
    // { selectedPostId && <Reportposts postId={selectedPostId} /> }

    // const baseURL = "http://localhost/UniYatWoon_AdminPanel/";


    useEffect(() => {
        fetch(endpoints.fetchposts)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => setPosts([]));
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

    const handleSavePost = async (postId) => {
        try {
            setSavingPostId(postId); // show loading for this post

            const res = await fetch(endpoints.savedposts, {
                method: "POST",
                credentials: "include", // important: send PHP session
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ post_id: postId }),
            });

            const data = await res.json();

            if (data.success) {
                // Add postId to savedPosts array
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
        <div className='post_container'>
            {posts.map(post => (
                <div className='postCard' key={post.id} style={{ marginBottom: "2rem" }}>
                    <h1 className='username'>{post.Username}</h1>
                    <h1 className='created_at'>{post.Created_at}</h1>
                    <img className='pf' src={`${BASE_URL}/${encodeURI(post.Profile_photo)}`} />
                    <p
                        style={{
                            maxHeight: expandedPost === post.id ? "1000px" : "25px",
                            overflow: "hidden",
                            transition: "max-height 0.3s ease",
                        }}
                    >
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
                                zIndex: 9,
                            }}
                        >
                            {expandedPost === post.id ? "See less" : "See more"}
                        </span>
                    )}

                    {/* Display media */}
                    <div className='media_container'>
                        {post.media.length > 0 && (
                            <div style={{ position: "relative", width: "300px" }}>

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

                                {/* MEDIA */}
                                <div
                                    className="hide-scrollbar"
                                    style={{
                                        display: "flex",
                                        overflowX: "auto",
                                        scrollSnapType: "x mandatory",
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
                            </div>
                        )}


                    </div>
                    <button className='reportBtn' onClick={() => setSelectedPostId(post.id)}>Report Post</button>
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
                        <Reportposts post_id={post.id} onReportComplete={() => setSelectedPostId(null)} />
                    )}
                </div>
            ))}
        </div>
    );
}


export default Fetchposts