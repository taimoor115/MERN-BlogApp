import axios from "axios";
import { useEffect, useState } from "react";
import { contentShorter } from "../utils/contentShorter";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { useAuth } from "../context/authContext/authContext";

interface Blogs {
  _id: string;
  title: string;
  image: string;
  content: string;
  category: string;
  tags: string;
}

const Home = () => {
  const [blogs, setBlogs] = useState<Blogs[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  console.log(user);

  const skeltons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/blogs")
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setBlogs(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <>
      <h1 className=" text-4xl font-bold text-white text-center mb-8 mt-7 ">
        Explore Blogs
      </h1>
      <div className=" grid sm:col-span-1 md:grid-cols-2 lg:grid-cols-3 space-y-7 place-items-center p-2">
        {isLoading && skeltons.map((skelton) => <Skeleton key={skelton} />)}
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="card bg-slate-800 text-white w-80 lg:w-80 md:w-80 shadow-xl"
          >
            <Link to={`/blogs/show/${blog._id}`} className="object-cover">
              <img
                src={blog.image}
                alt="Blog Image"
                className="rounded-xl cursor-pointer h-60 sm:h-40 lg:h-48 md:h-48 w-full object-cover"
              />
            </Link>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                <Link
                  to={`/blogs/show/${blog._id}`}
                  className=" text-4xl lg:text-2xl md:text-2xl font-bold"
                >
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-400">{contentShorter(blog.content)}</p>
              <div className="flex justify-between space-x-7">
                <p>{user?.username}</p>
                <p>{user?.createdAt.toString().slice(0, 10)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
