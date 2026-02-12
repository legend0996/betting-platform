import { apiFetch } from "./api";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: { email: string; password: string }) => {
  const result = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("token", result.token);

  return result;
};
