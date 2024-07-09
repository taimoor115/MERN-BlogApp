import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },

    content: {
      type: String,
    },

    publishDate: {
      type: Date,
      default: Date.now,
    },

    category: {
      type: String,
      enum: [
        "Software Development",
        "Web Development",
        "Mobile Development",
        "AI & Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Freelancing",
        "E-commerce",
        "Finance & Investment",
        "Self-Improvement",
        "Productivity Tips",
        "Travel",
        "Fashion",
        "Movie Reviews",
        "Book Reviews",
        "Music",
        "Astronomy",
        "Physics",
        "Social Issues",
        "Global Affairs",
      ],
    },
    tags: {
      type: [String],
      default: [],
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: 0,
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
      },
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
