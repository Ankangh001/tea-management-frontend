export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("auth_token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
