import React from "react";

const UserHome = ({ privateData, username, email, logoutHandler }) => {
  return (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <div className="whole-page">
        <h2>Welcome, {username}!</h2>
        <h3>Your email is: {email}</h3>

        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default UserHome;
