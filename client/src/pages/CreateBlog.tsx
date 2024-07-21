import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface FormData {
  title: string;
  image: string | ArrayBuffer | null;
  content: string;
  category: string;
  tags: string[];
}

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "",
    content: "",
    category: "",
    tags: [],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.post("/blogs", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Blog created successfully!");
      setLoading(false);
      navigate("/home");
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      className="form-control flex justify-center items-center gap-3 text-white mt-3 p-3"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4 lg:w-[800px] md:w-[800px]">
        <div className="text-5xl md:text-4xl lg:text-4xl font-bold text-center mb-8">
          Create Blog
        </div>
        <div>
          <label className="input input-primary flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <textarea
            className="textarea textarea-primary w-full"
            placeholder="Write Blog..."
            rows={10}
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea>
        </div>

        <div>
          <select
            className="select select-primary w-full max-w-xs"
            name="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option>Select a category</option>
            <option>Software Development</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>AI & Machine Learning</option>
            <option>Data Science</option>
            <option>Cybersecurity</option>
            <option>Freelancing</option>
            <option>E-commerce</option>
            <option>Finance & Investment</option>
            <option>Self-Improvement</option>
            <option>Productivity Tips</option>
            <option>Travel</option>
            <option>Fashion</option>
            <option>Movie Reviews</option>
            <option>Book Reviews</option>
            <option>Music</option>
            <option>Astronomy</option>
            <option>Physics</option>
            <option>Social Issues</option>
            <option>Global Affairs</option>
          </select>
        </div>

        <div>
          <label className="input input-primary flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Tags separated by commas"
              name="tags"
              value={formData.tags.join(",")}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value.split(",") })
              }
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button disabled={loading} className="btn btn-primary btn-wide">
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBlog;
