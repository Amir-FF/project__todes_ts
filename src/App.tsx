import { ToastContainer } from "react-toastify";
import TodoForm from "./features/todos/components/TodoForm";
import TodoTable from "./features/todos/components/TodoTable";

export default function App() {
  return (
    <>
      <TodoForm />
      <TodoTable />
      <ToastContainer position="top-right" closeOnClick={false} draggable />
    </>
  );
}
