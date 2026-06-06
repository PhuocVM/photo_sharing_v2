import React, { useState } from "react";
import { postModel } from "../../lib/fetchModelData";

function NewPhoto({ userId, onAdded }) {
  const [fileName, setFileName] = useState("");

  const addPhoto = () => {
    const name = fileName.trim();
    if (!name) return;
    setFileName("");
    postModel(`/photo`, { user_id: userId, file_name: name }).then((newPhoto) =>
      onAdded?.(
        newPhoto && newPhoto._id
          ? newPhoto
          : {
              _id: `local-${Date.now()}`,
              user_id: userId,
              file_name: name,
              date_time: new Date().toISOString(),
              comments: [],
            },
      ),
    );
  };

  return (
    <div>
      <input
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="New photo file name"
      />
      <button type="button" onClick={addPhoto}>
        Add photo
      </button>
    </div>
  );
}

export default NewPhoto;
