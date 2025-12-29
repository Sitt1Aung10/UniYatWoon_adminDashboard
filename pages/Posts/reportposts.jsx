// components/Posts/reportposts.jsx
import React, { useState } from 'react';
import endpoints from '../../endpoints/endpoints';
import '../Posts/postCss.css';

const Reportposts = ({ post_id, onReportComplete }) => {
  const [reason, setReason] = useState("");

  const handleReport = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postId", post_id);
    formData.append("reason", reason);

    try {
      const res = await fetch(endpoints.reportposts, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to report post");

      setReason("");
      onReportComplete?.(); // hide form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='reportForm' onSubmit={handleReport} style={{ marginTop: "1rem" }}>
      <div className="reportReasons">
        <label>
          <input
            type="radio"
            name="reason"
            value="spam"
            checked={reason === "spam"}
            onChange={(e) => setReason(e.target.value)}
          />
          Spam
        </label>

        <label>
          <input
            type="radio"
            name="reason"
            value="abuse"
            checked={reason === "abuse"}
            onChange={(e) => setReason(e.target.value)}
          />
          Abusive Content
        </label>

        <label>
          <input
            type="radio"
            name="reason"
            value="nudity"
            checked={reason === "nudity"}
            onChange={(e) => setReason(e.target.value)}
          />
          Nudity
        </label>

        <label>
          <input
            type="radio"
            name="reason"
            value="false_information"
            checked={reason === "false_information"}
            onChange={(e) => setReason(e.target.value)}
          />
          False Information
        </label>
      </div>
      <button style={{marginTop:'15px'}}  type="submit">Submit Report</button>
    </form>
  );
};

export default Reportposts;
