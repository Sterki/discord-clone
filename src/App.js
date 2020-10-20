import React, { useState } from "react";
import "./components/SidebarLeft";
import "./App.css";
import SidebarLeft from "./components/SidebarLeft";
import Header from "./components/Header";
import Sidebarprincipal from "./components/Sidebarprincipal";
import Chat from "./components/Chat";
import SidebarRight from "./components/SidebarRight";
import Subheader from "./components/Subheader";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      {!user ? (
        <div className="login">
          <Login />
        </div>
      ) : (
        <div className="app">
          <SidebarLeft />
          <div className="app__content">
            {/* header */}
            <Header />
            <Subheader />
            {/* channel */}
            <div className="app__content2">
              <Sidebarprincipal />
              <Chat />
              <SidebarRight />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
