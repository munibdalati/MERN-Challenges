import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      //2-adding this line to store username in the local storage to get it appeared in welcoming after login
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);


      navigate(`/private/${data.userType}`);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
    return (
      <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
          <h3 className="login-screen__title">Login</h3>
          {error && <span className="error-message"> {error}</span>}

          {/* email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
          </div>

          {/* password */}
          <div className="form-group">
            <label htmlFor="password">
              Password:
              <Link
                to="/forgotpassword"
                className="login-screen__forgotpassword"
                tabIndex={4}
              >
                {" "}
                Forgot Password?
              </Link>
            </label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
            />
          </div>

          <button type="submit" className="btn btn-primary" tabIndex={3}>
            Login
          </button>
          <span className="login-screen__subtext">
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    );
  
};

export default LoginScreen;

