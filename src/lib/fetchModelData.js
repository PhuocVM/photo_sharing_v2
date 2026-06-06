const API_URL = "https://rd6lgq-8081.csb.app/api";

function fetchModel(url) {
  return fetch(API_URL + url).then((res) => {
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  });
}

export function postModel(url, data) {
  return fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  });
}

export default fetchModel;
