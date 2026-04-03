"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDE_MENU_ITEMS } from "@/constants/side-menu";
import { useMyProfile } from "@/features/profile/hooks/use-my-profile";

const DEFAULT_PROFILE_IMG = "/assets/images/default profile.png";

interface MobileProfileOnlyMenuProps {
  onOpenProfileForm: () => void;
}

export default function MobileProfileOnlyMenu({
  onOpenProfileForm,
}: MobileProfileOnlyMenuProps) {
  const pathname = usePathname();
  const { data: profile } = useMyProfile();

  const profileImageUrl =
    profile?.profileImageUrl && profile.profileImageUrl.length > 0
      ? profile.profileImageUrl
      : DEFAULT_PROFILE_IMG;

  return (
    <div className="pt-6">
      <div className="flex flex-col items-center rounded-[16px] px-4 py-5 shadow-[0px_4px_24px_0px_#9CB4CA33]">
        <div className="relative mb-5">
          <Image
            src={profileImageUrl}
            alt="profile"
            width={70}
            height={70}
            unoptimized
            className="h-[70px] w-[70px] rounded-full"
          />
        </div>

        <ul className="w-full flex flex-col gap-2 text-[16px] font-medium text-gray-600">
          {SIDE_MENU_ITEMS.map((item) => {
            const isProfileItem = item.href === "/main/profile";
            const isActive = pathname === item.href;

            if (isProfileItem) {
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={onOpenProfileForm}
                    className={`flex h-[52px] w-full items-center gap-2 rounded-xl pl-5 text-left ${
                      isActive
                        ? "bg-primary-100 text-gray-950"
                        : "hover:ring-2 hover:ring-primary-100 hover:text-gray-950"
                    }`}
                  >
                    <Image
                      src={isActive ? item.blueIcon : item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex h-[52px] items-center gap-2 rounded-xl pl-5 ${
                    isActive
                      ? "bg-primary-100 text-gray-950"
                      : "hover:ring-2 hover:ring-primary-100 hover:text-gray-950"
                  }`}
                >
                  <Image
                    src={isActive ? item.blueIcon : item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}