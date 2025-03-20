import { useState } from "react";
import css from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [forgetPass, setForgetPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    console.log(loginData);
  };

  return (
    <div className={css.authForm}>
      {forgetPass ? (
        <div className={`${css.auth} ${css.authLogin}`}>
          <h3>Reset your password</h3>
          <p>We will send you an email to reset your password.</p>

          <form>
            <input type="email" placeholder="Email" />

            <div className={css.buttons}>
              <button>Submit</button>
              <span onClick={() => setForgetPass(false)}>Cancel</span>
            </div>
          </form>
        </div>
      ) : (
        <div className={`${css.auth} ${css.authLogin}`}>
          <h3>Login</h3>
          <p>Please login using account details bellow.</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className={css.buttons}>
              <button>Sign In</button>
              <span onClick={() => setForgetPass(true)}>
                Forgot your password?
              </span>
            </div>
            <Link to="/register">Create Account</Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
