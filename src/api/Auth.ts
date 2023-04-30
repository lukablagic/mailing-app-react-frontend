import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthResponse } from "../models/AuthResponse";
import { User } from "../models/User";

const API_BASE_URL = "https://localhost";

export async function registerUser(user: User): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user }),
  });
  const data = await response.json();
  return data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data.token;
}

export async function logoutUser(token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  localStorage.removeItem("token");
  if (!response.ok) {
    throw new Error("Failed to log out user");
  }
}
