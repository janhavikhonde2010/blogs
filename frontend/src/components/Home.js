import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles.css"; // Import styles

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", image: "", description: "" });

  // Memoized default blog posts
  const defaultBlogs = useMemo(() => [
    { title: "The Future of AI", image: "/1.jpg", description: "AI is reshaping industries, from healthcare to finance..." },
    { title: "Top JavaScript Frameworks in 2025", image: "/2.jpg", description: "JavaScript continues to dominate web development..." },
    { title: "How to Start a Startup", image: "/3.jpeg", description: "Every successful startup begins with a great idea..." },
    { title: "Rise of Electric Vehicles", image: "/4.jpg", description: "EVs are revolutionizing transportation..." }
  ], []); // Empty dependency array ensures memoization

  // Fetch blogs from MongoDB
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch stored token
        const response = await axios.get("https://blogs-backend-ivory.vercel.app/posts", {
          headers: {
            Authorization: `Bearer ${token}` // Send token with request
          }
        });
        setPosts([...defaultBlogs, ...response.data]); // Merge default & fetched blogs
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data?.message || error.message);
        setPosts(defaultBlogs); // Use default if API fails
      }
    };

    fetchBlogs();
  }, [defaultBlogs]); // Now it won't cause re-renders

  // Handle blog input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  // Handle form submission
  const addBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a blog.");
      return;
    }

    if (newBlog.title && newBlog.image && newBlog.description) {
      try {
        const response = await axios.post("https://blogs-backend-ivory.vercel.app/posts", newBlog, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts([...posts, response.data]); // Add new blog to state
        setNewBlog({ title: "", image: "", description: "" });
      } catch (error) {
        console.error("Error adding blog:", error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <h2>Welcome to the Blog</h2>

      {/* Add Blog Form */}
      <div className="add-blog-form">
        <h3>Add a New Blog</h3>
        <form onSubmit={addBlog}>
          <input type="text" name="title" placeholder="Enter Blog Title" value={newBlog.title} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Enter Image URL" value={newBlog.image} onChange={handleChange} required />
          <textarea name="description" placeholder="Enter Blog Description" value={newBlog.description} onChange={handleChange} required></textarea>
          <button type="submit">Add Blog</button>
        </form>
      </div>

      {/* Display Blogs */}
      <div className="blog-container">
        {posts.map((post, index) => (
          <div key={index} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
