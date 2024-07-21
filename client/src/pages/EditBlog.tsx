import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { FormData } from "./CreateBlog";
import toast from "react-hot-toast";

const EditBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "",
    content: "",
    category: "",
    tags: [],
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) =>
      setFormData({
        ...formData,
        title: res.data.title,
        image: res.data.image,
        content: res.data.content,
        category: res.data.category,
        tags: res.data.tags,
      })
    );
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .patch(`/blogs/${id}`, formData)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <form
      encType="multipart/form-data"
      className="form-control flex justify-center items-center gap-3 text-white mt-3 p-3"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4 lg:w-[800px] md:w-[800px]">
        <div className="text-5xl md:text-4xl lg:text-4xl font-bold text-center mb-8">
          Edit the Blog
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
          <img
            src={`${formData.image?.toString()}`}
            alt="image"
            width={70}
            height={70}
            className="mb-3 opacity-70"
          />
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
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value.split(",") })
              }
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button disabled={loading} className="btn btn-primary btn-wide">
            {loading ? "Updating..." : "Update blog"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditBlog;
