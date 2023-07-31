import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import UpdateUser from "./components/screens/UpdateUser";
import CreateUser from "./components/screens/CreateUser";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PrivateScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/private/:userType" element={<PrivateScreen />} />
          <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPasswordScreen />}
          />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/create" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
