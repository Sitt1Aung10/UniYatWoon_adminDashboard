import React, { useState } from "react";
import endpoints from "../../endpoints/endpoints";

const Comments = ({ post_id, commentComplete }) => {
    const [commentText, setCommentText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(endpoints.comment, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post_id: post_id,
                    Description: commentText,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to add comment");
            }

            setCommentText("");
            commentComplete?.();
        } catch (err) {
            console.error("Comment error:", err.message);
        }
    };

    return (
        <form className="commentForm" onSubmit={handleSubmit}>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add your comment here..."
                required
            />
            <button type="submit">Submit Comment</button>
        </form>
    );
};

export default Comments;
