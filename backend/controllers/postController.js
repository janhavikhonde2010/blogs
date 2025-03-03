const getPosts = (req, res) => {
    res.json({ message: "List of blog posts" });
  };
  
  const createPost = (req, res) => {
    res.json({ message: "Blog post created" });
  };
  
  module.exports = { getPosts, createPost };
  