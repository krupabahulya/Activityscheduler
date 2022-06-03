import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Home = () => {
  const [activities, setactivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/activities`
        );
        setactivities(data);
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
      <div className="row">
        {activities.map((activity) => (
          <div key={activity._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title ">{activity.type}</h5>
                <h6 className="card-subtitle ">By: {activity.creator.name}</h6>
                <h6 className="card-subtitle ">Day: {activity.date}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
