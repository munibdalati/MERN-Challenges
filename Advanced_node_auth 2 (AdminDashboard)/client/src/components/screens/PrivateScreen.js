import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CSS/PrivateScreen.css";
import UserHome from "./UserHome";
import AdminHome from "./AdminHome";
import SuperAdminHome from "./SuperAdminHome";
import UpdateUser from "./UpdateUser"; // Import the UpdateUser component



const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [users, setProducts] = useState([]);
  const [showUpdateUser, setShowUpdateUser] = useState(false); // State to control rendering of UpdateUser


  const navigate = useNavigate();

  // Retrieve userType from URL parameters
  const { userType } = useParams(); 
  // const { secretKey } = useParams(); 


  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);

        // 3- Retrieve the username from local storage
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);

        const storedemail = localStorage.getItem("email");
        setEmail(storedemail);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized to login");
      }
    };
    fetchPrivateData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    axios.get("/users").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      {userType === "SuperAdmin" ? (
        <SuperAdminHome
          privateData={privateData}
          username={username}
          email={email}
          users={users}
          logoutHandler={logoutHandler}
        />
      ) : (
        userType === 'Admin' ? (
          <AdminHome
          privateData={privateData}
          username={username}
          email={email}
          users={users}
          logoutHandler={logoutHandler}
        />
        ) : <UserHome
            privateData={privateData}
            username={username}
            email={email}
            logoutHandler={logoutHandler}
          /> // Add a fallback in case userType is not 'SuperAdmin' or 'Admin'
      )}
      {/* passing usertype as a props without viewing update page on adminpage*/}
      {showUpdateUser && (
        <UpdateUser
          userType={userType}
        />
      )}


    </>
  );
  
};

export default PrivateScreen;
