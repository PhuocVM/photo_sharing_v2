// Map file names to image URLs
const PHOTO_SRC_BY_FILE = {
  "malcolm1.jpg": require("../../images/malcolm1.jpg"),
  "malcolm2.jpg": require("../../images/malcolm2.jpg"),
  "ripley1.jpg": require("../../images/ripley1.jpg"),
  "ripley2.jpg": require("../../images/ripley2.jpg"),
  "took1.jpg": require("../../images/took1.jpg"),
  "took2.jpg": require("../../images/took2.jpg"),
  "kenobi1.jpg": require("../../images/kenobi1.jpg"),
  "kenobi2.jpg": require("../../images/kenobi2.jpg"),
  "kenobi3.jpg": require("../../images/kenobi3.jpg"),
  "kenobi4.jpg": require("../../images/kenobi4.jpg"),
  "ludgate1.jpg": require("../../images/ludgate1.jpg"),
  "ouster.jpg": require("../../images/ouster.jpg"),
};

// Parse date from ISO string
function parseModelDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr);
  } catch {
    return null;
  }
}

// Format date in friendly format (e.g., "Jan 5, 2009 at 3:30 PM")
function formatFriendlyDateTime(dateStr) {
  const date = parseModelDate(dateStr);
  if (!date) return dateStr || "Unknown date";

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export { PHOTO_SRC_BY_FILE, parseModelDate, formatFriendlyDateTime };
