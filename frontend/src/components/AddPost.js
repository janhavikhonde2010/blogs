import React, { useState } from "react";
import axios from "axios";
import "../styles.css"; // Import styles

const AddPost = ({ onPostAdded }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a blog.");
      return;
    }

    if (newPost.title && newPost.image && newPost.description) {
      try {
        const response = await axios.post(
          "https://backend-cts4yc3a9-janhavi8220s-projects.vercel.app/posts",
          newPost,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201) {
          onPostAdded(response.data); // Callback to update parent component
          setNewPost({ title: "", image: "", description: "" });
        }
      } catch (error) {
        console.error("Error adding post:", error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="add-post-container">
      <h3>Add a New Blog</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Blog Title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Enter Image URL"
          value={newPost.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          value={newPost.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AddPost;
