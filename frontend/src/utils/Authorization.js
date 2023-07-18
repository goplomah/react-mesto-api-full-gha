class Authorization {
  constructor({ dataBase }) {
    this._dataBase = dataBase;
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

  registration(password, email) {
    return this._request("signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  login(password, email) {
    return this._request("signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  checkToken() {
    const token = localStorage.getItem('token');
    return this._request("users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }
}

const authorization = new Authorization({
  dataBase: "https://api.goplomah.nomoredomains.xyz/",
});
export default authorization;
