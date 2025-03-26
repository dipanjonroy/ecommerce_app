import { Link, useNavigate } from "react-router-dom";
import css from "./Login.module.css";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { userRegister } from "../../../store/userAuthSlice";
import { errorMessage, successMessage } from "../../../utils/helper";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {userData, error} = useSelector((store)=>store.userAuth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      password,
    };

    try{
      await dispatch(userRegister(formData));
    } catch(err) {
      console.log(err);
      errorMessage("Registration failed.")
    }

  };

  useEffect(()=>{
    if(userData?.success){
      successMessage(userData?.message);
      navigate("/login")
    }

    if(error){
      errorMessage(error || "Somthing occured")
    }
  }, [userData, error, navigate])


  return (
    <div className={css.authForm}>
      <div className={`${css.auth} ${css.authRegister}`}>
        <h3>Create Account</h3>
        <p>Please register using account detail bellow.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
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
            <button>Create</button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
