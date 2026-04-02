const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

export function validateProfileImageFile(file: File): string | null {
  if (file.size === 0) {
    return "올바른 이미지 파일을 선택해 주세요.";
  }
  if (file.size > PROFILE_IMAGE_MAX_BYTES) {
    return "이미지 파일은 5MB 이하여야 합니다.";
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mimeOk = Boolean(file.type && ALLOWED_MIME.has(file.type));
  const extOk = ALLOWED_EXT.has(ext);
  if (!mimeOk && !extOk) {
    return "JPG, PNG, WEBP, GIF 형식만 업로드할 수 있습니다.";
  }

  return null;
}
