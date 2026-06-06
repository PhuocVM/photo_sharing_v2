import React, { useState } from "react";
import { postModel } from "../../lib/fetchModelData";

function NewComment({ photoId, onAdded }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    postModel(`/photo/${photoId}/comments`, { comment: trimmed }).then(
      (newComment) => {
        if (newComment) {
          onAdded?.(newComment);
        }
      },
    );
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default NewComment;
