import { Redirect, Route } from "react-router-dom";
import { selectUser } from "../features/appSlice";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Redirect to='/login' /> : <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
