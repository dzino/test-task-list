import { useContext } from "react";
import { NotificationManager } from "react-notifications";
import DataApp from "../context";

export default function Logout() {
  const [dataApp, setDataApp] = useContext(DataApp);
  const checkLogin = () => document.cookie.indexOf("user=") !== -1;

  const logout = () => {
    if (!checkLogin())
      return setDataApp((oldState) => ({ ...oldState, login: true }));

    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setDataApp((oldState) => ({ ...oldState, updateTime: Date.now() }));
      NotificationManager.info("Произведен выход", "Авторизация");
    });
  };

  return (
    <>
      <div className="my-5 mx-auto" style={{ width: "fit-content" }}>
        <button type="submit" className="btn btn-primary" onClick={logout}>
          {checkLogin() ? "Выйти" : "Войти"}
        </button>
      </div>
    </>
  );
}
