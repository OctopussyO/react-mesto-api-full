import { BASE_URL } from "./utils";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    return (res.ok) ? res.json() : Promise.reject(res);
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }

  getOwnerData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(this._handleResponse);
  }

  getData(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  saveUserData(token, data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  saveUserAvatar(token, data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  saveNewItem(token, data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  likeItem(token, itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  unlikeItem(token, itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  deleteItem(token, itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }
}

export const api = new Api({ baseUrl: BASE_URL });
