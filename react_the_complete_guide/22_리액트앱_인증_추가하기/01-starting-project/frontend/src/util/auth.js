import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storeExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storeExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  const tokenDuration = getTokenDuration();

  if (!token) {
    return;
  }

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function loader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}
