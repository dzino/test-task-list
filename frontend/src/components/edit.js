import { useState, useContext, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import DataApp from "../context";

export default function Edit() {
  const [dataApp, setDataApp] = useContext(DataApp),
    [description, setDescription] = useState(""),
    [done, setDone] = useState("");

  const checkSubmit = dataApp.selectTask?.id;

  useEffect(() => {
    setDescription(dataApp.selectTask?.description || "");
    setDone(dataApp.selectTask?.done || "");
  }, [dataApp.selectTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { id: dataApp.selectTask.id, description };
    fetch("/tasks-description", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        NotificationManager.error("Ошибка обновления!", "Задача");
        return setDataApp((oldState) => ({
          ...oldState,
          updateTime: Date.now(),
          selectTask: null,
          login: true,
        }));
      }
      setDataApp((oldState) => ({
        ...oldState,
        updateTime: Date.now(),
      }));
      NotificationManager.success("Задача успешно обновлена", "Задача");
    });
  };

  const doneSubmit = (event) => {
    event.preventDefault();
    const data = { id: dataApp.selectTask.id, done: +!done };
    setDone(data.done);
    fetch("/tasks-done", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        NotificationManager.error("Ошибка обновления!", "Задача");
        return setDataApp((oldState) => ({
          ...oldState,
          updateTime: Date.now(),
          selectTask: null,
          login: true,
        }));
      }
      setDataApp((oldState) => ({
        ...oldState,
        updateTime: Date.now(),
      }));
      NotificationManager.success("Задача успешно обновлена", "Задача");
    });
  };

  return (
    <div className="row">
      <div className="col-1 form-group form-check my-auto">
        <input
          type="checkbox"
          className="form-check-input"
          checked={done}
          onChange={doneSubmit}
          disabled={!dataApp.selectTask?.id}
          style={{ marginLeft: "auto" }}
        />
      </div>
      <form className="col input-group mx-auto my-3" onSubmit={handleSubmit}>
        <div className="form-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Задача"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={!dataApp.selectTask?.id}
            required
          />
        </div>

        <button
          type="submit"
          value="Submit"
          className="btn btn-primary"
          disabled={!checkSubmit}
        >
          Обновить
        </button>
      </form>
    </div>
  );
}
