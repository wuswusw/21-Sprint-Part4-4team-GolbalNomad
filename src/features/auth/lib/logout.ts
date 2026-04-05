export function logout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("nickname");
  localStorage.removeItem("profileImage");

  window.dispatchEvent(new Event("auth-change"));
}