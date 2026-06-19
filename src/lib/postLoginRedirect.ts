// Lets a CTA send the user to login, then continue on to an external
// destination (e.g. the Google Form) once they're authenticated.
const KEY = "star_post_login_redirect";

export function setPostLoginRedirect(url: string) {
  sessionStorage.setItem(KEY, url);
}

export function consumePostLoginRedirect(): string | null {
  const url = sessionStorage.getItem(KEY);
  if (url) sessionStorage.removeItem(KEY);
  return url;
}
