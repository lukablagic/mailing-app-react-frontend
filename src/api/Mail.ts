import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {AuthResponse} from '../models/AuthResponse';
import {User} from '../models/User';


const API_BASE_URL = 'http://localhost';





export async function getEmails(token: string): Promise<AuthResponse> {

  const response = await fetch(`${API_BASE_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${token}`
    }
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getEmail(id) {
  const response = await fetch(`${API_BASE_URL}/emails/${id}`);
  const email = await response.json();
  return email;
}

export async function sendEmail(data) {
  const response = await fetch(`${API_BASE_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const email = await response.json();
  return email;
}
