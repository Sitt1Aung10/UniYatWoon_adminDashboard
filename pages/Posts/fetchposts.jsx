import React from 'react'
import endpoints from '../../endpoints/endpoints'
import { BASE_URL } from '../../endpoints/endpoints';
import { useState, useEffect } from 'react';
import Reportposts from './reportposts';
import '../Posts/postCss.css';

const Fetchposts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    <Fetchposts onReport={setSelectedPostId} />
    { selectedPostId && <Reportposts postId={selectedPostId} /> }

    // const baseURL = "http://localhost/UniYatWoon_AdminPanel/";


    useEffect(() => {
        fetch(endpoints.fetchposts)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => setPosts([]));
    }, []);
    return (
        <div className='post_container'>
            {posts.map(post => (
                <div className='postCard' key={post.id} style={{ marginBottom: "2rem" }}>
                    <h1 className='username'>{post.Username}</h1>
                    <h1 className='created_at'>{post.Created_at}</h1>
                    <img className='pf' src={`${BASE_URL}/${encodeURI(post.Profile_photo)}`} />
                    <p className='description'>{post.Description}</p>

                    {/* Display media */}
                    {post.media.length > 0 && post.media.map((m, idx) => (
                        m.Media_type === "image" ? (
                            <img className='media'
                                src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                                alt="post image"
                            />
                        ) : (
                            <video
                                className='media'
                                key={idx}
                                controls
                                src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                                style={{ maxWidth: "300px", display: "block", marginBottom: "1rem" }}
                            />
                        )
                    ))}
                    <button className='reportBtn' onClick={() => setSelectedPostId(post.id)}>Report Post</button>

                    {selectedPostId === post.id && (
                        <Reportposts post_id={post.id} onReportComplete={() => setSelectedPostId(null)} />
                    )}
                </div>
            ))}
        </div>
    );
}


export default Fetchposts