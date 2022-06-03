import { useState } from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const Login = () => {
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated, loading, loginUser } = useAuth();

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all the fields");
    await loginUser({ email, password });
  };
  if (isAuthenticated) return <Navigate to="/protected/new-activity" replace />;
  if (loading) return <Loading />;
  return (
    <div className="container">
      <div className="mt-5 row justify-content-center">
        <form className="col-md-6" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
