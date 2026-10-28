import { useAppSelector } from "../../../app/hooks";
import TodoRow from "./TodoRow";

const COLUMNS = ["#", "Title", "Status", "Delete"] as const;

export default function TodoTable() {
  const items = useAppSelector((state) => state.todos.items);

  return (
    <section>
      <div className="container mx-auto mt-5 px-4">
        <div className="w-full md:mx-auto md:w-1/2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left align-middle">
              <thead>
                <tr className="border-b border-gray-200">
                  {COLUMNS.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-4 py-3 font-semibold"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {items.map((todo, index) => (
                  <TodoRow key={todo.id} todo={todo} index={index + 1} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
