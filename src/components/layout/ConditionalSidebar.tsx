'use client';

import { usePathname } from 'next/navigation';
import Sidemenu from '@/components/common/Sidemenu';
import { SIDEBAR_INCLUDE_PATHS, SIDEBAR_EXCLUDE_PATHS } from '@/constants/route';

export default function ConditionalSidebar() {
  const pathname = usePathname();
  const showSidebar =
    SIDEBAR_INCLUDE_PATHS.some((path) => pathname.startsWith(path)) &&
    !SIDEBAR_EXCLUDE_PATHS.some((path) => pathname.startsWith(path));

  if (!showSidebar) return null;

  return (
    <div className="tablet:block tablet:w-[178px] desktop:w-[290px] hidden">
      <Sidemenu />
    </div>
  );
}
