import Link from "next/link";
import facebookIcon from "@/assets/icons/facebook.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import twitterIcon from "@/assets/icons/X_twitter.svg";
import youtubeIcon from "@/assets/icons/youtube.svg";

function Footer() {
  return (
    <div className="flex items-center justify-center desktop:px-50 tablet:px-10 px-6 tablet:py-15 py-[30px] text-13">
      <div className="flex flex-wrap tablet:flex-nowrap items-center justify-between w-full">
        <span className="text-gray-400">©codeit - 2023</span>
        <div className="order-first tablet:order-none w-full tablet:w-auto text-center pb-5 tablet:pb-0 text-gray-600" >
            <Link href="/">Pirvacy Policy</Link>
            <span className="mx-6">∙</span>
            <Link href="/">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="https://www.facebook.com/"><img src={facebookIcon.src} alt="facebook" /></Link>
            <Link href="https://www.instagram.com/"><img src={instagramIcon.src} alt="instagram" /></Link>
            <Link href="https://x.com/"><img src={twitterIcon.src} alt="twitter" /></Link>
            <Link href="https://www.youtube.com/"><img src={youtubeIcon.src} alt="youtube" /></Link>
        </div>
      </div>
    </div> 
  );
}

export default Footer;