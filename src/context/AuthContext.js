import { createContext, useContext, useEffect, useState } from "react";
import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/me`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUser(data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setToken(null);
        localStorage.removeItem("token");
        toast.error(error.response?.data.error || error.message);
        setLoading(false);
      }
    };
    token && getUser();
  }, [token]);

  const registerUser = async (formData) => {
    try {
      setLoading(true);
      const {
        data: { token },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        formData
      );
      localStorage.setItem("token", token);
      setToken(token);
      console.log(token);
      setIsAuthenticated(true);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data.error || error.messsage);
      setLoading(false);
    }
  };

  const loginUser = async (formData) => {
    try {
      setLoading(true);
      const {
        data: { token },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        formData
      );
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        registerUser,
        loginUser,
        logout,
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthState;
