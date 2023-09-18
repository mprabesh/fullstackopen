import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAnecdotes } from "../services/requests";
import { useDispatchNotification } from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useDispatchNotification();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(postAnecdotes, {
    onSuccess: (response) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(response));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      //if entered anecdote is less than 5 char notify
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: `anecdote must be more than 5 character!!`,
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
        });
      }, 3000);
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 });
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: `"${content}" added!`,
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
        });
      }, 3000);
    }

    event.target.anecdote.value = "";
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
