import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-white px-4 pt-[80px] pb-10 md:px-5">
      <div className="flex w-full max-w-[328px] flex-col items-center md:max-w-[640px]">
        <Link href="/" aria-label="메인 페이지로 이동">
          <Image
            src="/assets/images/earth.png"
            alt="GlobalNomad 지구 로고"
            width={144}
            height={144}
            priority
          />
        </Link>

        <Link
          href="/"
          aria-label="메인 페이지로 이동"
          className="mt-6 hidden md:block"
        >
          <Image
            src="/assets/images/login_font.png"
            alt="GlobalNomad"
            width={255}
            height={31}
            priority
          />
        </Link>

        <LoginForm />
      </div>
    </main>
  );
}