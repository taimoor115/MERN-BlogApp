import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ShowBlog } from "../types/types";

const Read = () => {
  const [blog, setBlog] = useState<ShowBlog>();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err.response.data.error);
      });
  }, [id]);

  console.log(blog);

  return (
    <div className="flex flex-col justify-center items-center  text-white">
      <div className="text-center">
        <h1 className="font-extrabold text-[80px] mt-5 "> {blog?.title}</h1>
        <div className="flex justify-center space-x-8 mt-4 text-gray-300 font-bold">
          <p>
            {blog?.user.map((user) =>
              user.username
                .charAt(0)
                .toUpperCase()
                .concat(user.username.slice(1))
            )}
          </p>
          <p>{blog?.createdAt.toString().slice(0, 10)}</p>
        </div>
        <div className="flex justify-center mt-7">
          <img
            src={blog?.image}
            alt="blog"
            className="rounded-xl h-[300px] w-[700px] object-cover"
          />
        </div>

        <p className="text-white text-start p-20"> {blog?.content}</p>
        <div className="text-start font-bold p-20">
          Category: {blog?.category}
          {blog?.tags.map((tag) => (
            <p className="text-blue-500 hover:text-blue-300"> #{tag}</p>
          ))}
          <p>{blog?.user.map((user) => user.email)}</p>
        </div>

        <div>
          <button className="btn btn-primary btn-wide">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Read;
