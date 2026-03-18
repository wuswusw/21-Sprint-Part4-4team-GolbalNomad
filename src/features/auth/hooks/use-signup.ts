import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth.api";
import type { SignupRequest, SignupResponse } from "../types/auth.type";

export function useSignup() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
  });
}