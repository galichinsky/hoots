import sendRequest from "./sendRequest";

const BASE_URL = "/api/hoots";

export function index() {
  return sendRequest(BASE_URL, "GET");
}

export function show(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`, "GET");
}

export function create(data) {
  return sendRequest(BASE_URL, "POST", data);
}

export function createComment(hootId, data) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, "POST", data);
}

export function deleteHoot(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`, "DELETE");
}

export function update(hootId, data) {
  return sendRequest(`${BASE_URL}/${hootId}`, "PUT", data);
}