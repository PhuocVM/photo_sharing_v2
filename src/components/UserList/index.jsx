import React, { useState, useEffect } from "react";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});

  useEffect(() => {
    fetchModel("/user/list").then(setUsers);
  }, []);

  useEffect(() => {
    if (!users.length) return;
    Promise.all(
      users.map((u) =>
        fetchModel(`/photo/photosOfUser/${u._id}`).then((photos) =>
          photos.reduce((sum, photo) => sum + (photo.comments?.length || 0), 0),
        ),
      ),
    ).then((counts) =>
      setCommentCounts(
        Object.fromEntries(users.map((u, i) => [u._id, counts[i] || 0])),
      ),
    );
  }, [users]);

  return (
    <div>
      <p>All of users.</p>
      {users.map((u) => (
        <div key={u._id}>
          <Link to={`/users/${u._id}`}>
            {u.first_name} {u.last_name}
          </Link>{" "}
          <span>({commentCounts[u._id] || 0})</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;
