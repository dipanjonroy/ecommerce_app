import { useEffect, useState } from "react";
import css from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authChecker, userLogin } from "../../../store/userAuthSlice";
import { errorMessage, successMessage } from "../../../utils/helper";

function Login() {
  const [forgetPass, setForgetPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userData, error } = useSelector((store) => store.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      await dispatch(userLogin(loginData));
    } catch (error) {
      console.log(err);
      errorMessage("Login failed.");
    }
  };

  useEffect(() => {
    if (userData?.success) {
      successMessage(userData?.message);
      navigate(userData?.isAdmin ? "/admin/dashboard" : "/", { replace: true });
    }

    if (error) {
      errorMessage(error || "Somthing wrong occured!");
    }
  }, [userData, error, navigate]);

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
