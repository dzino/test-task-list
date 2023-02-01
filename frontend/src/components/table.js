import { useState, useEffect, useContext } from "react";
import DataApp from "../context";

export default function Table() {
  const [dataApp, setDataApp] = useContext(DataApp);

  const [tasks, setTasks] = useState(null),
    [allPage, setAllPage] = useState(null),
    [page, setPage] = useState(1),
    [sort, setSort] = useState("name"),
    [asc, setAsc] = useState(1);

  const thead = [
      { id: "name", title: "Имя" },
      { id: "email", title: "E-mail" },
      { id: "description", title: "Задача" },
      { id: "done", title: "Выполненно" },
    ],
    pagination = Array.from({ length: allPage }, (_, index) => index + 1);

  useEffect(() => {
    fetch("/tasks?" + new URLSearchParams({ page: page - 1, sort, asc }))
      .then((response) => response.json())
      .then((response) => {
        setAllPage(response.count);
        setTasks(response.tasksData);
        setDataApp((oldState) => ({
          ...oldState,
          selectTask:
            response.tasksData.find(
              (task) => task?.id === oldState.selectTask?.id
            ) || null,
        }));
      });
  }, [page, sort, asc, dataApp.updateTime]);

  const sortSwitch = (id) => {
    if (sort === id) return setAsc((oldState) => +!oldState);
    setSort(id);
    setAsc(1);
  };

  console.log(tasks);

  return (
    tasks && (
      <>
        <div style={{ minHeight: 200 }}>
          <table className="table">
            <thead>
              <tr>
                {thead.map((i) => (
                  <th
                    key={i.id}
                    className={i.id === "description" ? "col-6" : "col-2"}
                    onClick={() => sortSwitch(i.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {i.title + (sort === i.id ? (asc ? " ⬇" : " ⬆") : "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() =>
                    setDataApp((oldState) =>
                      dataApp.selectTask?.id === task.id
                        ? { ...oldState, selectTask: null }
                        : { ...oldState, selectTask: task }
                    )
                  }
                  style={
                    dataApp.selectTask?.id === task.id
                      ? {
                          backgroundColor: "black",
                          color: "white",
                          cursor: "pointer",
                        }
                      : {
                          cursor: "pointer",
                        }
                  }
                >
                  <th scope="row">{task.name}</th>
                  <td>{task.email}</td>
                  <td>
                    <div className="row">
                      <p className="col-8 my-0">{task.description}</p>
                      <p className="col-4 my-0 text-primary">
                        {task.edit_desc && "Адм. редакт."}
                      </p>
                    </div>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={task.done}
                      disabled
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto" style={{ width: "fit-content" }}>
          <nav aria-label="...">
            <ul className="pagination pagination-sm">
              {pagination.map((i) => (
                <li
                  key={i}
                  className={page === i ? "page-item disabled" : "page-item"}
                  onClick={() => setPage(i)}
                >
                  <a className="page-link" href="#">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    )
  );
}
