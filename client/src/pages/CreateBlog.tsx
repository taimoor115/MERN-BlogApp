const CreateBlog = () => {
  return (
    <form className="form-control flex justify-center items-center  gap-3 text-white mt-3 p-3">
      <div className=" space-y-4  lg:w-[800px] md:w-[800px]">
        <div className=" text-5xl md:text-4xl lg:text-4xl font-bold text-center mb-8">
          Create Blog
        </div>
        <div>
          <label className="input input-primary flex items-center gap-2 ">
            <input
              type="text"
              className="grow"
              placeholder="Title"
              name="title"
            />
          </label>
        </div>
        <div>
          {/* <label className="input input-bordered flex items-center gap-2"> */}
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
          {/* </label> */}
        </div>

        <div>
          {/* <label className="input input-bordered flex items-center gap-2"> */}
          <textarea
            className="textarea textarea-primary w-full"
            placeholder="Write Blog..."
            // cols={30}
            rows={10}
            name="content"
          ></textarea>
          {/* </label> */}
        </div>

        <div>
          <select
            className="select select-primary w-full max-w-xs"
            name="category"
          >
            <option disabled selected>
              Select a category
            </option>
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
              type="tags"
              className="grow"
              placeholder="Tags must separated by commas"
              name="tags"
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button className="btn  btn-primary btn-wide">Create Blog</button>
        </div>
      </div>
    </form>
  );
};

export default CreateBlog;
