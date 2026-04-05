const AUTH_MESSAGE_KEY = "authMessage";
const AUTH_MESSAGE_EVENT = "auth-message";

export function setAuthMessage(message: string) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(AUTH_MESSAGE_KEY, message);
  window.dispatchEvent(new Event(AUTH_MESSAGE_EVENT));
}

export function consumeAuthMessage() {
  if (typeof window === "undefined") return "";

  const message = sessionStorage.getItem(AUTH_MESSAGE_KEY) ?? "";

  if (message) {
    sessionStorage.removeItem(AUTH_MESSAGE_KEY);
  }

  return message;
}

export function subscribeAuthMessage(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(AUTH_MESSAGE_EVENT, callback);

  return () => {
    window.removeEventListener(AUTH_MESSAGE_EVENT, callback);
  };
}