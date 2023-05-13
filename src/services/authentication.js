import { getUserData } from "./localStorage";

export const storeToken = (id) => {
  let token = `sjbsnjdfbebfiefeifowhf,${id},asjhsjkcvbjkscbscjkbjsckbjsc`;
  localStorage.setItem("token", token);
  return token;
};

export const getUserID = () => {
  let token = localStorage.getItem("token");
  let tokenID = Number(token.split(",")[1]);
  return tokenID;
};

const hasUser = (id) => {
  let userData = getUserData();

  for (const data of userData) {
    if (data.id === id) {
      return true;
    }
  }

  return false;
};

export const verifyToken = (token) => {
  if (token) {
    let tokenID = token.split(",")[1];
    if (tokenID) {
      return hasUser(Number(tokenID));
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const isAlreadyLoggedIn = (token) => {
  if (token) {
    return true;
  }
  return false;
};
