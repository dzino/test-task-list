import { useState, useContext } from "react";
import { NotificationManager } from "react-notifications";
import DataApp from "../context";

export default function Login() {
  const [dataApp, setDataApp] = useContext(DataApp),
    [name, setName] = useState(""),
    [pass, setPass] = useState("");

  const checkLogin = () => document.cookie.indexOf("user=") !== -1;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, pass };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setName("");
      setPass("");
      if (!checkLogin())
        return NotificationManager.error(
          "Не верный логин/пароль!",
          "Авторизация"
        );
      NotificationManager.info("Авторизация пройдена", "Авторизация");
      setDataApp((oldState) => ({
        ...oldState,
        login: false,
        updateTime: Date.now(),
      }));
    });
  };

  return (
    <>
      <form
        className="mx-auto"
        style={{ width: "400px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label for="exampleInputEmail1">Email адрес</label>
          <input
            type="text"
            className="form-control"
            placeholder="Введите имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Введите пароль"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            required
          />
        </div>
        <button type="submit" value="Submit" className="btn btn-primary mt-4">
          Авторизоваться
        </button>
      </form>
    </>
  );
}
