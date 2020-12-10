import { apiConfig } from "./utils";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._contentType = options.headers["Content-Type"];
  }

  _handleResponse(res) {
    return (res.ok) ? res.json() : Promise.reject(res);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  saveUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  saveUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  saveNewItem(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  likeItem(itemId) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  unlikeItem(itemId) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  deleteItem(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

export const api = new Api(apiConfig);
