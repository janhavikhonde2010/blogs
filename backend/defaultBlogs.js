const mongoose = require("mongoose");
const Post = require("./models/PostModel");
require("dotenv").config();

const defaultBlogs = [
  { title: "Blog 1", description: "Description 1", image: "default1.jpg" },
  { title: "Blog 2", description: "Description 2", image: "default2.jpg" },
  { title: "Blog 3", description: "Description 3", image: "default3.jpg" }
];

const insertDefaultBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB Connected - Checking & Inserting Default Blogs...");

    for (const blog of defaultBlogs) {
      const exists = await Post.findOne({ title: blog.title });
      if (!exists) {
        await Post.create(blog);
      }
    }

    console.log("🎉 Default Blogs Inserted!");
  } catch (error) {
    console.error("❌ Error inserting default blogs:", error);
  } finally {
    mongoose.connection.close();
  }
};

insertDefaultBlogs();
