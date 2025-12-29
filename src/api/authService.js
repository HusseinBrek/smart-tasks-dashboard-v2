import axios from "axios";
import { API_URL } from "../config/api";

export async function loginUser(email, password) {
  const response = await axios.get(
    `${API_URL}/users?email=${email}&password=${password}`
  );
  if (response.data.length > 0) {
    return response.data[0];
  }
  throw new Error("Invalid email or password");
}

export async function registerUser(userData) {
  const checkUser = await axios.get(`${API_URL}/users?email=${userData.email}`);
  if (checkUser.data.length > 0) {
    throw new Error("User already registered!");
  }
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
}

export const findUserByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/users?email=${email}`);
  return response.data;
};

export const updatePassword = async (userId, newPassword) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${userId}`, {
      password: newPassword,
    });

    return response.status === 200;
  } catch (error) {
    console.error("Update password failed:", error);
    return false;
  }
};
