import { SubmissionError } from "redux-form";

import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

const registerUser = (username, password, role, familyCode) => dispatch => {
  return fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ username, password, role, familyCode })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => {
    const { reason, message, location } = err;
    if (reason === "ValidationError") {
      // Convert ValidationErrors into SubmissionErrors for Redux Form
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
  });
};

export { registerUser };
