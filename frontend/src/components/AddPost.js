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
    if (newPost.title && newPost.image && newPost.description) {
      try {
        const response = await axios.post("https://blogs-backend-ivory.vercel.app/posts", newPost);
        if (response.status === 201) {
          onPostAdded(response.data); // Callback to update parent component
          setNewPost({ title: "", image: "", description: "" });
        }
      } catch (error) {
        console.error("Error adding post:", error);
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
