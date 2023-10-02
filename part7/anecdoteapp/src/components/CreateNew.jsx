import { useField } from "../hooks/useField";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content, author);
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={content.name}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name={author.name}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
