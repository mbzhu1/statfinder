export function apiRequest(path, method = "GET", data) {
  console.log(JSON.stringify(data));
  console.log("calling fetch")
  return fetch(`../../parse`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("first then")
      //console.log(response.json())
      return response.json();
    })
    .catch((response) => {
      if (response.status === "error") {
        throw new CustomError(response.code, response.message);
      }
    });
}

// Create an Error with custom message and code
export function CustomError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

