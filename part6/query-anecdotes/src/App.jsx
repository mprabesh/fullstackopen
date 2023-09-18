import AnecdoteForm from "./components/AnecdoteForm";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "./services/requests";
import { NotificationContextProvider } from "./NotificationContext";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAll(),
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Loading data....</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <Anecdote anecdotes={anecdotes} />
    </NotificationContextProvider>
  );
};

export default App;
