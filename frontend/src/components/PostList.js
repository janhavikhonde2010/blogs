import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Import styles

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://blogs-backend-ivory.vercel.app/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-list-container">
      <h2>Recent Blog Posts</h2>
      <div className="blog-container">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
