const AddBlogForm = ({ newBlog, setNewBlog, addBlog }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title{" "}
        <input
          type="text"
          value={newBlog.title}
          onChange={(e) => {
            setNewBlog({ ...newBlog, title: e.target.value });
          }}
        />
        <br />
        author{" "}
        <input
          type="text"
          value={newBlog.author}
          onChange={(e) => {
            setNewBlog({ ...newBlog, author: e.target.value });
          }}
        />
        <br />
        url{" "}
        <input
          type="text"
          value={newBlog.url}
          onChange={(e) => {
            setNewBlog({ ...newBlog, url: e.target.value });
          }}
        />
        <br />
        <button>create</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
