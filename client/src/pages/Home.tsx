import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/blogs")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return <div>Home</div>;
};

export default Home;
