import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/RegisterScreen.css";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/");
    }
  }, []);

  const registerHandler = async (e) => {
    // checking if the secretkey is correct to let the admin enter
    if (userType === "Admin" && secretKey !== "admin") {
      e.preventDefault();

      alert("Invalid Admin");
    } else {
      e.preventDefault();

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      if (password !== confirmPassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Password do not match");
      }

      try {
        const { data } = await axios.post(
          "/api/auth/register",
          { username, email, password, userType },
          config
        );
        localStorage.setItem("authToken", data.token);
        //2-adding this line to store username in the local storage to get it appeared in welcoming after login
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userType", userType); // Save userType in local storage

        navigate(`/private/${data.userType}`);
      } catch (error) {
        console.log(error.response); // Add this line to log the error response
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message"> {error}</span>}
        {/* radio button */}
        <div className="register-as">
          <div> Register as:</div>
          <div>
            {" "}
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />{" "}
            User
          </div>
          <div>
            {" "}
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />{" "}
            Admin
          </div>
        </div>

        {/* if the user choose to enter as an admin a secret key input will appear to him */}
        {/* Secret Key */}

        {userType === "Admin" ? (
          <div className="form-group">
            <label>Secret Key</label>
            <input
              type="text"
              placeholder="Enter secret key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        ) : null}

        {/* username */}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
          />
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* confirm password */}
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
