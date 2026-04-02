/** 사이드 메뉴 링크·아이콘 (`ConditionalSidebar`의 `SIDEBAR_INCLUDE_PATHS`와 href 정합 유지) */

export interface SideMenuItem {
  href: string;
  icon: string;
  blueIcon: string;
  label: string;
}

export const SIDE_MENU_ITEMS: SideMenuItem[] = [
  {
    href: "/main/profile",
    icon: "/assets/icons/user.svg",
    blueIcon: "/assets/icons/userBlue.svg",
    label: "내 정보",
  },
  {
    href: "/main/reservations",
    icon: "/assets/icons/list.svg",
    blueIcon: "/assets/icons/listBlue.svg",
    label: "예약내역",
  },
  {
    href: "/main/my-experiences",
    icon: "/assets/icons/calendar.svg",
    blueIcon: "/assets/icons/calendarBlue.svg",
    label: "내 체험 관리",
  },
  {
    href: "/main/reservations-status",
    icon: "/assets/icons/setting.svg",
    blueIcon: "/assets/icons/settingBlue.svg",
    label: "예약 현황",
  },
];
