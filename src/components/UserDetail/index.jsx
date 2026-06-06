import React from "react";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => setUser(data));
  }, [userId]);
  if (!user) {
    return <Typography variant="body1">User not found!!</Typography>;
  }
  return (
    <div>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <h2>
        <strong>Location:</strong>
        {user.location}
      </h2>
      <br />
      <h2>
        <strong>Occupation:</strong>
        {user.occupation}
      </h2>
      <Link to={`/photos/${userId}`}>View Photos of {user.first_name}</Link>
    </div>
  );
}

export default UserDetail;
