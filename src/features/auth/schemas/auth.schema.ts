import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해 주세요.")
    .email("이메일 형식으로 작성해 주세요."),
  password: z
    .string()
    .trim()
    .min(1, "비밀번호를 입력해 주세요.")
    .min(8, "8자 이상 작성해 주세요."),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "이메일을 입력해 주세요.")
      .email("이메일 형식으로 작성해 주세요."),
    nickname: z
      .string()
      .trim()
      .min(1, "닉네임을 입력해 주세요.")
      .max(10, "열 자 이하로 작성해 주세요."),
    password: z
      .string()
      .trim()
      .min(1, "비밀번호를 입력해 주세요.")
      .min(8, "8자 이상 작성해 주세요."),
    passwordConfirm: z
      .string()
      .trim()
      .min(1, "비밀번호를 한 번 더 입력해 주세요."),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;