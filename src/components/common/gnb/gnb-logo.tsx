import Image from "next/image";
import Link from "next/link";

function GnbLogo() {
    return (
        <Link href="/">
            <Image src="/assets/images/textLogo.png" alt="logo" width={172} height={28} className="hidden tablet:block" />
            <Image src="/assets/images/symbolLogo.png" alt="logo" width={28} height={28} className="block tablet:hidden" />
        </Link>
    );
}

export default GnbLogo;