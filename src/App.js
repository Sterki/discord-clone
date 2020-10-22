import React, { useEffect, useState } from "react";
import "./components/SidebarLeft";
import "./App.css";
import SidebarLeft from "./components/SidebarLeft";
import Header from "./components/Header";
import Sidebarprincipal from "./components/Sidebarprincipal";
import Chat from "./components/Chat";
import SidebarRight from "./components/SidebarRight";
import Subheader from "./components/Subheader";
import Login from "./components/Login";
import { auth } from "./firebase";
import store from "./store";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthAction } from "./actions/userAction";
import db from "./firebase";
const wrapApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // set the user into our reducer
        dispatch(
          setUserAuthAction({
            displayName: authUser.displayName,
            email: authUser.email,
            uid: authUser.uid,
            photo: authUser.photoURL,
          })
        );
      } else {
        // just logout and set our reducer to null
        dispatch(setUserAuthAction(null));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default wrapApp;
