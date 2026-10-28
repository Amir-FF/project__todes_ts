import { useId, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks";
import { addTodo } from "../todosSlice";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const titleId = useId();
  const errorId = `${titleId}-error`;

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitle("");
      setError("Title is required.");
      return;
    }

    dispatch(addTodo(title));
    toast.success("Todo added");
    setTitle("");
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="w-full md:mx-auto md:w-1/2">
          <h2 className="mb-5 text-xl font-bold">Create Todo:</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label
                htmlFor={titleId}
                className="mb-2 block text-sm font-medium"
              >
                Title
              </label>

              <input
                type="text"
                id={titleId}
                value={title}
                onChange={handleChange}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {error && (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
