
const API_BASE_URL = 'http://localhost';

export async function getEmails() {
  const response = await fetch(`${API_BASE_URL}/emails`);
  const emails = await response.json();
  return emails;
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
