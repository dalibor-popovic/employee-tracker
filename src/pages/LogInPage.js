import { useState } from "react";
import "./LogInPage.css";
import { Link } from "react-router-dom";
//Icons
import google from "../assets/google.svg";
//Material UI
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
//Firebase
import { signInWithGoogle } from "../firebase/Firebase";
import { auth } from "../firebase/Firebase";

const LogInPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-header'>
          <div className='login-logo'>
            <LockSharpIcon style={{ color: "white" }} />
          </div>
          <h2>Sign In</h2>
        </div>

        <form className='login-form' onSubmit={login}>
          <TextField
            className='login-input'
            required
            label='Email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            className='login-input'
            required
            type='password'
            label='Password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button
            disabled={loading}
            type='submit'
            className='login-button'
            style={{
              backgroundColor: `${loading ? "#f5f5f5" : "#1d7def"}`,
              color: `${loading ? "#303030" : "white"}`,
            }}
          >
            Log in
          </Button>
        </form>
        <div className='google-container'>
          <h5>Or sign in with google</h5>
          <div className='google-button' onClick={signInWithGoogle}>
            <img src={google} alt='google-logo' className='google-logo' />
            <h3>SIGN IN</h3>
          </div>
        </div>
        <Divider />
        <div className='signup-link'>
          <Link to='/signup'>Don't have an account? Sign Up </Link>
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

export default LogInPage;
