import Blog from "../model/blogModel.js";
import { v2 as cloudinary } from "cloudinary";
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    if (!blogs) {
      return res.status(500).json({
        error: "No blogs found",
      });
    }
    return res.status(200).json({
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const showBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "You must be logged in to create a blog..." });
    }

    const userId = req.user._id.toString();

    if (blogData.image) {
      const uploadedResponse = await cloudinary.uploader.upload(blogData.image);
      blogData.image = uploadedResponse.secure_url;
    }

    const blog = await Blog.create({ ...req.body, user: userId });
    return res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ error: "You must be logged in to create a blog..." });
    }

    const result = await Blog.findByIdAndUpdate(id, blog, {
      runValidators: true,
      new: true,
    });

    if (!result) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

export const destroyBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ error: "No Blog Found" });
    }
    return res.status(200).json({ message: "Book deleted Successfull" });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};
