import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { LoginRequest, LoginResponse } from "../types/auth.type";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
}