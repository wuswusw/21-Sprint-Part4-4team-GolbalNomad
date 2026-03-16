import Link from "next/link";

function GnbLogo() {
    return (
        <Link href="/">
            <img src="/assets/images/textLogo.png" alt="logo" className="hidden tablet:block" />
            <img src="/assets/images/symbolLogo.png" alt="logo" className="block tablet:hidden" />
        </Link>
    );
}

export default GnbLogo;