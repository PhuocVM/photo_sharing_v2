import React from "react";
import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import fetchModel, { postModel } from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ user, onLogout }) {
  const [contextLabel, setContextLabel] = useState(null);
  const userDetail = useMatch("/users/:userId");
  const userPhotos = useMatch("/photos/:userId");
  const userList = useMatch({ path: "/users", end: true });
  
  useEffect(() => {
    const updateLabel = async () => {
      if (userDetail?.params?.userId) {
        try {
          const u = await fetchModel(`/user/${userDetail.params.userId}`);
          setContextLabel(`${u.first_name} ${u.last_name}`);
        } catch {
          setContextLabel("User");
        }
      } else if (userPhotos?.params?.userId) {
        try {
          const u = await fetchModel(`/user/${userPhotos.params.userId}`);
          setContextLabel(`Photos of ${u.first_name} ${u.last_name}`);
        } catch {
          setContextLabel("User Photos");
        }
      } else if (userList) {
        setContextLabel("User List");
      }
    };
    updateLabel();
  }, [userDetail, userPhotos, userList]);

  const handleLogout = async () => {
    try {
      await postModel("/admin/logout", {});
    } catch (err) {
      console.error("Logout error:", err);
    }
    onLogout();
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h3>Vũ Minh Phước</h3>
      </div>
      <div className="topbar-center">
        <p>{contextLabel}</p>
      </div>
      <div className="topbar-right">
        <span>Hi {user?.first_name}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TopBar;
