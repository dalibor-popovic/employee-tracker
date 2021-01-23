import { useEffect } from "react";
import "./App.css";
//Components
import EmployeeTracker from "./pages/EmployeeTracker";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
//Firebse
import { auth } from "./firebase/Firebase";
//Redux
import { login, logout } from "./features/appSlice";
import { useDispatch } from "react-redux";
//Router
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      authUser
        ? dispatch(
            login({
              username: authUser.displayName
                ? authUser.displayName
                : authUser.email,
              profilePic: authUser.photoURL,
              id: authUser.uid,
            })
          )
        : dispatch(logout());
    });
    return unsub;
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={EmployeeTracker} />
          <PublicRoute path='/login' component={LogInPage} />
          <PublicRoute path='/signup' component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
