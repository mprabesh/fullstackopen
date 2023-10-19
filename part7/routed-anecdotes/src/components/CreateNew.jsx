import { useField } from "../hooks";

export const CreateNew = (props) => {
    const newAnecdoteContent = useField("text");
    const newAnecdoteAuthor = useField("text");
    const newAnecdoteURL = useField("text");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.addNew({
        content: newAnecdoteContent.value,
        author: newAnecdoteAuthor.value,
        url: newAnecdoteURL.value,
        votes: 0,
      });
    };
  
    const resetForm = () => {
      const emptyField = {
        target: {
          value: "",
        },
      };
      newAnecdoteContent.onChange(emptyField);
      newAnecdoteAuthor.onChange(emptyField);
      newAnecdoteURL.onChange(emptyField);
    };
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={resetForm}>
          <div>
            content
            <input name="content" {...newAnecdoteContent} />
          </div>
          <div>
            author
            <input name="author" {...newAnecdoteAuthor} />
          </div>
          <div>
            url for more info
            <input name="url" {...newAnecdoteURL} />
          </div>
          <button>create</button>
          <input type="reset" value="reset" />
        </form>
      </div>
    );
  };
  