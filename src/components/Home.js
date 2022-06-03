import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteActivity = async (activityId) => {
    await fetch(`${process.env.REACT_APP_API_URL}//activities/${activityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setActivities((prev) => ({ ...prev, activities: data })))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/activities`
        );
        setActivities(data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong 😔. Please come back later");
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="container mt-5">
      <h2>Your scheduled activities</h2>
      <div className="row">
        {activities.map((activity) => (
          <div key={activity._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title ">{activity.type}</h5>
                <h6 className="card-subtitle mt-2">
                  Creator: {activity.creator.name}
                </h6>
                <h6 className="card-subtitle mt-2">
                  Performer: {activity.performer}
                </h6>
                <h6 className="card-subtitle mt-2">Date: {activity.date}</h6>
                <button
                  className="mt-3"
                  onClick={() => deleteActivity(activity._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
