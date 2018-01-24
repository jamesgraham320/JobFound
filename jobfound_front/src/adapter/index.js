const baseUrl = "http://localhost:3000";

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
    return fetch(`${baseUrl}/${route}/${id}`, patchRequest(body)).then(
      responseHandler()
    );
  }
  static deleteFetch(route = "users", id) {
    return fetch(`${baseUrl}/${route}/${id}`, {
      method: "DELETE",
      headers: headers()
    }).then(responseHandler());
  }
  static getUser() {
    return fetch(`${baseUrl}/current-user`, getRequest()).then(
      responseHandler()
    );
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

function patchRequest(body) {
  return {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body)
  };
}

function responseHandler(response) {
  return response => {
    if (response.ok) {
      return response.json();
    } else {
      throw response.json();
    }
  };
}
