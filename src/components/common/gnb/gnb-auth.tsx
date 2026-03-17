import Link from "next/link";

function GnbAuth() {
    return (
        <div className="flex items-center gap-2 text-14 text-gray-950">
            <Link href="/auth/login" className="hover:bg-primary-500 hover:text-white rounded-xl px-4 py-3">
            로그인
            </Link>
            <Link href="/auth/signup" className="hover:bg-primary-500 hover:text-white rounded-xl px-4 py-3">
            회원가입
            </Link>
      </div>
    );
}

export default GnbAuth;