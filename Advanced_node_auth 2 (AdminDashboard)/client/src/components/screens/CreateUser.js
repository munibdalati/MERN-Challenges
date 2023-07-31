import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState("User");

  const navigate = useNavigate();
  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/createUser", {
        username,
        email,
        password,
        userType,
      })
      .then((result) => {
        console.log(result);
        navigate("/private/Admin"); //to let submit button return you to the user page
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2>Add User</h2>

          {/* userType */}
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
            <div>
              {" "}
              <input
                type="radio"
                name="UserType"
                value="SuperAdmin"
                onChange={(e) => setUserType(e.target.value)}
              />{" "}
              SuperAdmin
            </div>
          </div>
          {/* username */}
          <div className="mb-2">
            <label>Username</label>
            <input
              type="text"
              placeholder="enter name"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* email */}
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* password */}
          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
