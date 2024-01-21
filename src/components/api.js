//api
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "0e80c708-a109-4922-99c3-35b8103960ba",
    "Content-Type": "application/json",
  },
};

const checkRequest = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};
//информация о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

//загрузка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

//Редактирование профиля
export const changeUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

//Обновление аватара пользователя
export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

//Добавление новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

// Постановка и снятие лайка
export const like = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};

export const unlike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => {
      console.log(err);
    });
};
