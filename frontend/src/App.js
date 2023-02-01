import { useState } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Table from "./components/table";
import Edit from "./components/edit";
import Login from "./components/login";
import DataApp from "./context";
import Create from "./components/create";
import Logout from "./components/logout";

function App() {
  const dataApp = useState({
    selectTask: null,
    updateTime: null,
    login: false,
  });
  const checkLogin = () => document.cookie.indexOf("user=") !== -1;
  return (
    <div className="App">
      <DataApp.Provider value={dataApp}>
        <div className="container my-4">
          {dataApp[0].login ? (
            <Login />
          ) : (
            <>
              {dataApp[0].selectTask && checkLogin() ? <Edit /> : <Create />}
              <Table />
              <Logout />
            </>
          )}
        </div>
      </DataApp.Provider>
      <NotificationContainer />
    </div>
  );
}

export default App;
