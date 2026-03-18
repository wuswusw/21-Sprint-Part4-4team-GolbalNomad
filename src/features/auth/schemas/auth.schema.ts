export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string) {
  if (!value.trim()) return "이메일을 입력해 주세요.";
  if (!EMAIL_REGEX.test(value)) return "이메일 형식으로 작성해 주세요.";
  return "";
}

export function validateNickname(value: string) {
  if (!value.trim()) return "닉네임을 입력해 주세요.";
  if (value.length > 10) return "열 자 이하로 작성해 주세요.";
  return "";
}

export function validatePassword(value: string) {
  if (!value.trim()) return "비밀번호를 입력해 주세요.";
  if (value.length < 8) return "8자 이상 작성해 주세요.";
  return "";
}

export function validatePasswordConfirm(
  password: string,
  passwordConfirm: string
) {
  if (!passwordConfirm.trim()) return "비밀번호를 한 번 더 입력해 주세요.";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return "";
}