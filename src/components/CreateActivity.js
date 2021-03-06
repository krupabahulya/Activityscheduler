import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateActivity = () => {
  const navigate = useNavigate();
  const [{ type, creator, performer }, setFormState] = useState({
    type: "",
    performer: "",
  });

  const handleInputChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!type || !performer) return alert("All fields are required");
      const data = JSON.stringify({ type, performer });
      const { data: newActivity } = await axios.post(
        `${process.env.REACT_APP_API_URL}/activities`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/");

      setFormState({
        type: "",
        performer: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.error || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Type
              </label>
              <input
                type="text"
                className="form-control"
                id="type"
                value={type}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="performer" className="form-label">
                Performer
              </label>
              <input
                type="text"
                className="form-control"
                id="performer"
                value={performer}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/*  <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="appt" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="appt"
                value={time}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;
