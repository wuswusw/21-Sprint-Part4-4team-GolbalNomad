import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark' | 'white' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: '2xl' | 'full';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode; 
}

const Button = ({
  variant = 'primary',
  size = 'md',
  rounded = '2xl',
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-[#3D9EF2] text-white hover:bg-[#4488D8]",
    secondary: "bg-[#C6C8CF] text-white hover:bg-[#BBBBBB]",
    white: "bg-white text-[#333333] border border-[#DDDDDD] hover:bg-gray-50",
    outline: "border border-[#707177] bg-white text-[#707177] hover:bg-blue-50",
    dark: "bg-[#333333] text-white hover:bg-[#111111]",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
  };


  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    full: "w-full py-3.5 text-base",
  };

  const roundedStyles = rounded === 'full' ? 'rounded-full' : 'rounded-2xl';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles} ${size !== 'full' ? 'w-fit' : ''} ${className}`}
      {...props}
    >
      {leftIcon && <span className={`${children ? 'mr-2' : ''} flex items-center`}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={`${children ? 'ml-2' : ''} flex items-center`}>{rightIcon}</span>}
    </button>
  );
};

export default Button;