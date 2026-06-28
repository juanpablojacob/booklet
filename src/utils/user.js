const userInstance = null;

export function saveUser(user) {
  sessionStorage.setItem("BOOKLET_USER", JSON.stringify(user));
}

export function getUser() {
  let user = userInstance;
  if (!user) {
    user = JSON.parse(sessionStorage.getItem("BOOKLET_USER"));
  }
  return user;
}
