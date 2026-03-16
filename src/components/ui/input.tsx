"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";
import Image from "next/image";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  isPassword?: boolean;
  rightIcon?: ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      isPassword = false,
      rightIcon,
      className = "",
      labelClassName = "",
      containerClassName = "",
      errorClassName = "",
      id,
      type,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className={labelClassName}>
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            {...props}
            type={inputType}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={`
              w-full
              outline-none
              transition
              ${isPassword || rightIcon ? "pr-12" : ""}
              ${className}
            `}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="absolute right-4 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
            >
              <Image
                src={
                  showPassword
                    ? "/assets/icons/active_on.svg"
                    : "/assets/icons/active_off.svg"
                }
                alt=""
                width={24}
                height={24}
              />
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className={errorClassName}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;