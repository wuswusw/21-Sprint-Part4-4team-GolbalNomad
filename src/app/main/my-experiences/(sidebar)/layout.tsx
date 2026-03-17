// 내 체험관리페이지에서만 사이드메뉴

import Sidemenu from '@/components/common/Sidemenu';

export default function MyExperiencesSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto flex w-[980px] gap-12.5">
        <div className="w-72.5">
          <Sidemenu />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
