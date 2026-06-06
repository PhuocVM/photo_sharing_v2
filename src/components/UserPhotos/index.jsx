import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
import { PHOTO_SRC_BY_FILE, formatFriendlyDateTime } from "./photoData";
import NewComment from "./NewComment";
import NewPhoto from "./NewPhoto";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState([]);
  const { userId, photoId } = useParams();
  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => setUser(data));
    fetchModel(`/photo/photosOfUser/${userId}`).then((data) => setPhoto(data));
  }, [userId]);
  return (
    <div>
      <Typography variant="h4">
        Photos of {user?.first_name} {user?.last_name}
      </Typography>
      <NewPhoto
        userId={userId}
        onAdded={(newPhoto) => setPhoto((prev) => [...prev, newPhoto])}
      />
      {photo.map((p) => {
        const imageSrc = PHOTO_SRC_BY_FILE[p.file_name];
        return (
          <div key={p._id}>
            <Typography variant="subtitle2">
              {formatFriendlyDateTime(p.date_time)}
            </Typography>
            {imageSrc && (
              <img src={imageSrc} alt={p.file_name} className="photo-imagine" />
            )}
            {p.comments && p.comments.length > 0 && (
              <div className="photo-comment-list">
                {p.comments.map((comment) => (
                  <div key={comment._id} className="photo-comment-item">
                    <p className="photo-comment-date">
                      {formatFriendlyDateTime(comment.date_time)}
                    </p>
                    <p className="photo-comment-text">{comment.comment}</p>
                  </div>
                ))}
              </div>
            )}
            <NewComment
              photoId={p._id}
              onAdded={(newComment) =>
                setPhoto((prev) =>
                  prev.map((item) =>
                    item._id === p._id
                      ? {
                          ...item,
                          comments: [...(item.comments || []), newComment],
                        }
                      : item,
                  ),
                )
              }
            />
            <Typography variant="body1">Photo ID: {p._id}</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default UserPhotos;
