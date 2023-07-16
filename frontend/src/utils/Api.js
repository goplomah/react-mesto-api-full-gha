export class Api {
  constructor(data) {
    this._dataBase = data.dataBase;
    // this._headers = data.headers;
  }

  _request(endpoint, option) {
    return fetch(`${this._dataBase + endpoint}`, option).then((res) =>
      this._checkResponse(res)
    );
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Упс... Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request("users/me", { headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }, });
  }

  getInitCard() {
    const token = localStorage.getItem('token');
    return this._request("cards", { headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }, });
  }

  setUserInfo({ name, job }) {
    const token = localStorage.getItem('token');
    return this._request("users/me", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about: job,
      }),
    });
  }

  updateAvatar({ avatar }) {
    const token = localStorage.getItem('token');
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  addCard({ title, link }) {
    const token = localStorage.getItem('token');
    return this._request("cards", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        link,
      }),
    });
  }

  addLike(_id) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  deleteLike(_id) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${_id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  changeLikeCardStatus(_id, isLiked) {
    return isLiked ? this.addLike(_id) : this.deleteLike(_id);
  }

  removeCard(_id) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const api = new Api({
  dataBase: "http://localhost:3000/",
  // headers: {
  //   authorization: `Bearer ${token}`,
  //   "Content-Type": "application/json",
  // },
});

export default api;
