const baseUrl = "http://localhost:3000";

export class AuthAdapter {
  static login(body) {
    return fetch(`${baseUrl}/auth/google_oauth2`, getRequest()).then(
      responseHandler()
    );
  }
}

export class RestfulAdapter {
  static indexFetch(route = "users") {
    return fetch(`${baseUrl}/${route}`, getRequest()).then(responseHandler());
  }
  static showFetch(route = "users", id) {
    return fetch(`${baseUrl}/${route}/${id}`, getRequest()).then(
      responseHandler()
    );
  }
  static createFetch(route = "users", body) {
    return fetch(`${baseUrl}/${route}`, postRequest(body)).then(
      responseHandler()
    );
  }
  static editFetch(route = "users", id, body) {
    return fetch(`${baseUrl}/${route}/${id}`, postRequest(body)).then(
      responseHandler()
    );
  }
  static deleteFetch(route = "users", id) {
    return fetch(`${baseUrl}/${route}/${id}`, {
      method: "DELETE",
      headers: headers()
    }).then(responseHandler());
  }
}

function headers() {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("token")
  };
}

function getRequest() {
  return {
    headers: headers()
  };
}

function postRequest(body) {
  return {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  };
}

function responseHandler(response) {
  return response => {
    return response.json();
  };
}
