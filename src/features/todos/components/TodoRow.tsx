import { memo } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks";
import { deleteTodo, toggleTodo } from "../todosSlice";
import type { Todo } from "../types";

interface TodoRowProps {
  todo: Todo;
  /** 1-based row number shown in the first column. */
  index: number;
}

function TodoRow({ todo, index }: TodoRowProps) {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
    toast.warn("Todo updated");
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.error("Todo deleted");
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <th scope="row" className="px-4 py-3 font-medium text-gray-900">
        {index}
      </th>

      <td className="px-4 py-3 text-gray-700">{todo.title}</td>

      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark "${todo.title}" as completed`}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
        />
      </td>

      <td className="px-4 py-3">
        <button
          type="button"
          onClick={handleDelete}
          className="cursor-pointer rounded-md border border-red-500 px-2 py-1 text-sm text-red-500 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default memo(TodoRow);
