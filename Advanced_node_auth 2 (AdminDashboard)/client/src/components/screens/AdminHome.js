import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./CSS/AdminHome.css";
import { Link } from "react-router-dom";

const AdminHome = ({ privateData, username, email, users, logoutHandler }) => {

  return (
    <div>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <div className="whole-page">
        <h2>Welcome, {username}!</h2>
        <h3>Your email is: {email}</h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                
                  <Link to={`/update/${user._id}`}>
                  
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary logout-btn" onClick={logoutHandler}>
          Logout
        </button>{" "}
      </div>
    </div>
  );
};

export default AdminHome;
