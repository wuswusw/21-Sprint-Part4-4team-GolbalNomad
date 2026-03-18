import Gnb from '@/components/common/gnb/gnb';
import Footer from '@/components/common/Footer';
import ConditionalSidebar from '@/components/layout/ConditionalSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Gnb />
      <div className="mx-auto flex w-[980px] gap-12.5">
        <ConditionalSidebar />
        <div className="flex w-full flex-col items-start gap-7.5">{children}</div>
      </div>
      <Footer />
    </>
  );
}
