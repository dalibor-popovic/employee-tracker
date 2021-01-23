import { useEffect, useState } from "react";
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
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    });

    return unsub;
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        {loading ? (
          <Spinner />
        ) : (
          <Switch>
            <PrivateRoute exact path='/' component={EmployeeTracker} />
            <PublicRoute path='/login' component={LogInPage} />
            <PublicRoute path='/signup' component={SignUpPage} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
