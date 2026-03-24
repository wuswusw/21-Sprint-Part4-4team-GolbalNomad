'use client';

import { usePathname } from 'next/navigation';
import Sidemenu from '@/components/common/Sidemenu';

const SIDEBAR_PATHS = [
  '/main/profile',
  '/main/reservations',
  '/main/my-experiences',
  '/main/reservations-status',
];

export default function ConditionalSidebar() {
  const pathname = usePathname();
  const showSidebar = SIDEBAR_PATHS.some((path) => pathname.startsWith(path));

  if (!showSidebar) return null;

  return (
    <div className="w-72.5">
      <Sidemenu />
    </div>
  );
}
