import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Register";
import Layout from "./Layout";
import AuthState from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import CreateActivity from "./components/CreateActivity";

const App = () => {
  return (
    <AuthState>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Signup />} />
          <Route path="protected" element={<ProtectedRoute />}>
            <Route path="Home" element={<Home />} />
            <Route path="new-activity" element={<CreateActivity />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </AuthState>
  );
};

export default App;
