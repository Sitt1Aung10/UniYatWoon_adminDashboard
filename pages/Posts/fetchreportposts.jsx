import React, { use } from 'react'
import endpoints from '../../endpoints/endpoints'
import { BASE_URL } from '../../endpoints/endpoints'
import { useState, useEffect } from 'react'
import '../Posts/postCss.css'
const Fetchreportposts = () => {
    const [reportPosts, setReportPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoints.fetchreportposts)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then(data => {
        // Safety: guarantee media exists
        const normalized = data.map(r => ({
          ...r,
          media: Array.isArray(r.media) ? r.media : []
        }));

        setReportPosts(normalized);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load reports");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (postId) => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {
    const res = await fetch(endpoints.deletePost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Delete failed");

    // Remove deleted post from UI
    setReportPosts(prev =>
      prev.filter(r => r.Reported_post_id !== postId)
    );

  } catch (err) {
    console.error(err);
    alert("Failed to delete post");
  }
};


  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reportpost_container">
      {reportPosts.length === 0 && <p>No reports found.</p>}

      {reportPosts.map(report => (
        <div className="reportpostCard" key={report.id}>
          <h2>Reported Post</h2>

          <p><strong>Reporter:</strong> {report.Reporter_username}</p>
          <p><strong>Reason:</strong> {report.Reason}</p>
          <p>{report.Description}</p>

          {/* MEDIA */}
          {report.media.length > 0 && (
            <div className="mediaWrapper">
              {report.media.map((m, idx) =>
                m.Media_type === "image" ? (
                  <img
                    key={idx}
                    className="media"
                    src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                    alt="post media"
                  />
                ) : (
                  <video
                    key={idx}
                    className="media"
                    controls
                    src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                  />
                )
              )}
              <br></br>
               <button  onClick={() => handleDelete(report.Reported_post_id)}  style={{backgroundColor:'red',color:'black',fontWeight:'bolder'}}>Delete Post</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Fetchreportposts