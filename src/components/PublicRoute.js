import { Redirect, Route } from "react-router-dom";
import { selectUser } from "../features/appSlice";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Component {...props} /> : <Redirect to='/' />;
      }}
    />
  );
};

export default PublicRoute;
