// 내 체험관리페이지에서만 사이드메뉴

import Sidemenu from '@/components/common/side-menu';

export default function MyExperiencesSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-72.5">
        <Sidemenu />
      </div>
      <div className="w-full">{children}</div>
    </>
  );
}
