export function enableOAuth() {
  localStorage.setItem('oauth', 'true');
}

export function disableOAuth() {
  localStorage.setItem('oauth', 'false');
}

export function OAuthStat() {
  return localStorage.getItem('oauth') === 'true';
}

export function setOAuthInfo(user) {
  localStorage.setItem('oauth-user', user.login || '');
  localStorage.setItem('oauth-home', user.homeUrl || '');
  localStorage.setItem('oauth-avatar', user.avatarUrl || '');
  localStorage.setItem('oauth-token', user.accessToken || '');
}

export function unsetOAuthInfo() {
  localStorage.removeItem('oauth-user');
  localStorage.removeItem('oauth-home');
  localStorage.removeItem('oauth-avatar');
  localStorage.removeItem('oauth-token');
}

export function getOAuthInfo() {
  return {
    login: localStorage.getItem('oauth-user'),
    homeUrl: localStorage.getItem('oauth-home'),
    avatarUrl: localStorage.getItem('oauth-avatar'),
    accessToken: localStorage.getItem('oauth-token'),
  };
}