import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser({userTypeAdmin}) {
  const { id } = useParams();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState("User");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUser/" + id)
      .then((result) => {
        console.log(result);
        setUsername(result.data.username);
        setEmail(result.data.email);
        setPassword(result.data.password);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/updateUser/" + id, {
        username,
        email,
        password,
        userType,
      })
      .then((result) => {
        console.log(result);
        console.log(userTypeAdmin); // Log the userType when pressing the update button

          
        navigate("/private/Admin"); //to let submit button return you to the user page
        console.log(username)
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
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
              value={username}
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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
