import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Import styles

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://backend-cts4yc3a9-janhavi8220s-projects.vercel.app/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data?.message || error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-list-container">
      <h2>Recent Blog Posts</h2>
      <div className="blog-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))
        ) : (
          <p>No blogs available. Please add some posts.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
