import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Privacy Policy" },
  { href: "/", label: "FAQ" },
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/", icon: "/assets/icons/facebook.svg", alt: "facebook" },
  { href: "https://www.instagram.com/", icon: "/assets/icons/instagram.svg", alt: "instagram" },
  { href: "https://x.com/", icon: "/assets/icons/X_twitter.svg", alt: "twitter" },
  { href: "https://www.youtube.com/", icon: "/assets/icons/youtube.svg", alt: "youtube" },
];

function Footer() {
  return (
    <div className="flex items-center justify-center desktop:px-50 tablet:px-10 px-6 tablet:py-15 py-[30px] text-13 border-t border-[#E0E0E5]">
      <div className="flex flex-wrap tablet:flex-nowrap items-center justify-between w-full">
        <span className="text-gray-400">©codeit - 2023</span>
        <div className="order-first tablet:order-none w-full tablet:w-auto text-center pb-5 tablet:pb-0 text-gray-600">
          {NAV_LINKS.map((link, index) => (
            <span key={link.label}>
              {index > 0 && <span className="mx-6">∙</span>}
              <Link href={link.href}>{link.label}</Link>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <Link key={link.alt} href={link.href} target="_blank" rel="noopener noreferrer">
              <img src={link.icon} alt={link.alt} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
