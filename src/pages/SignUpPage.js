import { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
//Material UI
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
//Firebase
import { auth } from "../firebase/Firebase";
//Redux
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: `${firstName + " " + lastName}`,
          })
          .then(() => {
            dispatch(
              login({
                profilePic: null,
                id: userAuth.user.uid,
                username: `${firstName + " " + lastName}`,
              })
            );
          });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <div className='signup-header'>
          <div className='login-logo'>
            <LockSharpIcon style={{ color: "white" }} />
          </div>
          <h2>Sign Up</h2>
        </div>
        <form className='signup-form' onSubmit={register}>
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: "1rem" }}
              className='signup-input'
              required
              label='Firs Name'
              variant='outlined'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></TextField>
            <TextField
              className='signup-input'
              required
              label='Last Name'
              variant='outlined'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></TextField>
          </div>
          <TextField
            className='signup-input'
            required
            label='Email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            type='password'
            className='signup-input'
            required
            label='Password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button
            disabled={loading}
            type='submit'
            className='signup-button'
            style={{
              backgroundColor: `${loading ? "#f5f5f5" : "#1d7def"}`,
              color: `${loading ? "#303030" : "white"}`,
            }}
          >
            Sign up
          </Button>
        </form>
        <Divider />
        <div className='login-link'>
          <Link to='/login'>You have an account? Log In </Link>
        </div>
      </div>
      {error && (
        <Alert variant='outlined' severity='error'>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default SignUpPage;
