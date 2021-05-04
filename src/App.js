import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./components/Login/UserLogin";
import AdminLogin from "./components/Login/AdminLogin";
import UserSignUp from "./components/SignUp/UserSignUp";
import AdminSignup from "./components/SignUp/AdminSignup";
import { useState } from "react";
import Posts from "./components/Posts/Posts";
import CreatePost from "./components/Posts/CreatePost";
import EditPost from "./components/Posts/EditPost";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [element, setElement] = useState("");

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/user-login">
            <UserLogin
              isLogin={isLogin}
              setLogin={setLogin}
              setUser={setUser}
            />
          </Route>
          <Route path="/admin-login">
            <AdminLogin
              isLogin={isLogin}
              setLogin={setLogin}
              setUser={setUser}
            />
          </Route>
          <Route path="/user-signup">
            <UserSignUp
              isLogin={isLogin}
              setLogin={setLogin}
              setUser={setUser}
            />
          </Route>
          <Route path="/admin-signup">
            <AdminSignup
              isLogin={isLogin}
              setLogin={setLogin}
              setUser={setUser}
            />
          </Route>
          <Route path="/posts">
            <Posts
              setLogin={setLogin}
              setUser={setUser}
              setElement={setElement}
              element={element}
            />
          </Route>
          <Route path="/createpost">
            <CreatePost />
          </Route>
          <Route path="/editpost">
            <EditPost element={element} setElement={setElement} />
          </Route>
          <Route path="/">
            <HomePage user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
