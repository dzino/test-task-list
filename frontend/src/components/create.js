import { useState, useContext } from "react";
import { NotificationManager } from "react-notifications";
import DataApp from "../context";

export default function Create() {
  const [dataApp, setDataApp] = useContext(DataApp),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, email, description };
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200)
        return NotificationManager.error("Ошибка создания!", "Задача");
      setName("");
      setEmail("");
      setDescription("");
      setDataApp((oldState) => ({ ...oldState, updateTime: Date.now() }));
      NotificationManager.success("Задача успешно создана", "Задача");
    });
  };

  return (
    <div className="row">
      <form className="input-group mx-auto my-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Имя"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          style={{ maxWidth: 200 }}
        />
        <input
          type="email"
          className="form-control"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{ maxWidth: 300 }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Задача"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <button type="submit" value="Submit" className="btn btn-primary">
          Создать
        </button>
      </form>
    </div>
  );
}
